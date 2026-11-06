import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/Modal/Modal";
import { useGameStore, actions } from "../../lib/gameStore";
import {
  buildSkills,
  skillDamage,
  professorMove,
  evaluateBattle,
  PROFESSOR_MAX_HP,
  STUDENT_MAX_HP,
} from "../../lib/battle";
import { CLEAR_LINE } from "../../lib/grades";
import { askArchangel } from "../../lib/archangel";
import { ANGEL, getProfessorAvatar, getStudentAvatar } from "../../data/characters";
import * as C from "../../components/common/Common.style";
import * as S from "./Battle.style";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const isExam = (key) => key === "midterm" || key === "final";
const MAX_BALLS = 10;

function initialState(skills) {
  return {
    pp: Object.fromEntries(skills.map((s) => [s.key, s.maxPP])),
    score: 0,
    studentHp: STUDENT_MAX_HP,
    lost: 0,
    blessed: false,
    angelUsed: false,
  };
}

export default function Battle() {
  const { id } = useParams({ from: "/dungeons/$id" });
  const navigate = useNavigate();
  const { dungeons, user } = useGameStore();
  const dungeon = dungeons.find((d) => d.id === id);
  const skills = useMemo(() => (dungeon ? buildSkills(dungeon.ratio) : []), [dungeon]);

  const [battle, setBattle] = useState(() => initialState(skills));
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [hit, setHit] = useState({ target: null, key: 0, text: "" });
  const [result, setResult] = useState(null);
  const [grade, setGrade] = useState(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    if (dungeon) setMessage(`야생의 ${dungeon.professor} 교수님이 나타났다!`);
  }, [dungeon?.id]);

  if (!dungeon) {
    return (
      <Layout title="던전">
        <S.Missing>
          던전을 찾을 수 없어요.
          <C.Button as={Link} to="/dungeons">
            던전 리스트로
          </C.Button>
        </S.Missing>
      </Layout>
    );
  }

  const prof = getProfessorAvatar(dungeon.avatar);
  const hero = getStudentAvatar(user?.avatar);
  const profHp = Math.max(0, PROFESSOR_MAX_HP - battle.score);
  const remaining = Object.values(battle.pp).reduce((a, b) => a + b, 0);
  const locked = busy || !!result;

  const showHit = (target, text) => setHit((h) => ({ target, text, key: h.key + 1 }));

  const finish = (score, fainted) => {
    const r = evaluateBattle({ score, fainted });
    setResult({ ...r, fainted });
    setGrade(r.suggestedGrade);
  };

  const handleSkill = async (skill) => {
    if (locked || battle.pp[skill.key] <= 0) return;
    setBusy(true);

    const blessedHit = battle.blessed && isExam(skill.key);
    const { damage, crit } = skillDamage(skill, Math.random, blessedHit);
    const pp = { ...battle.pp, [skill.key]: battle.pp[skill.key] - 1 };
    const score = Math.min(PROFESSOR_MAX_HP, battle.score + damage);
    let next = { ...battle, pp, score, blessed: blessedHit ? false : battle.blessed };
    setBattle(next);
    setMessage(
      `용사의 ${skill.name}! ${blessedHit ? "대천사의 가호로 " : crit ? "급소에 맞았다! " : ""}${damage.toFixed(1)} 데미지!`,
    );
    showHit("prof", `-${damage.toFixed(1)}`);
    await wait(1000);
    if (!alive.current) return;

    const left = Object.values(pp).reduce((a, b) => a + b, 0);
    if (score >= PROFESSOR_MAX_HP || left === 0) {
      setMessage(left === 0 ? "모든 스킬을 사용했다! 결과는...?" : `${dungeon.professor} 교수님이 쓰러졌다!`);
      await wait(900);
      if (alive.current) finish(score, false);
      return;
    }

    // 교수님의 반격
    const move = professorMove({ pp, usedKey: skill.key });
    const nextPP = { ...pp };
    let lost = next.lost;
    if (move.stolen) {
      nextPP[move.stolen] -= 1;
      lost += skills.find((s) => s.key === move.stolen).perHit;
    }
    const studentHp = Math.max(0, next.studentHp - move.damage);
    next = { ...next, pp: nextPP, studentHp, lost };
    setBattle(next);
    setMessage(`${dungeon.professor} 교수님의 ${move.text}`);
    showHit("student", move.stolen ? "PP -1" : move.damage > 0 ? `-${move.damage}` : "MISS");
    await wait(1100);
    if (!alive.current) return;

    if (studentHp <= 0) {
      setMessage("용사는 눈앞이 깜깜해졌다...");
      await wait(900);
      if (alive.current) finish(score, true);
      return;
    }
    if (Object.values(nextPP).reduce((a, b) => a + b, 0) === 0) {
      setMessage("더 이상 쓸 수 있는 스킬이 없다! 결과는...?");
      await wait(900);
      if (alive.current) finish(score, false);
      return;
    }
    setMessage("용사는 무엇을 할까?");
    setBusy(false);
  };

  const handleAngel = async () => {
    if (locked || battle.angelUsed) return;
    setBusy(true);
    setBattle((b) => ({ ...b, angelUsed: true, blessed: true, studentHp: STUDENT_MAX_HP }));
    setMessage("대천사 강림! HP가 모두 회복되고 다음 시험 스킬은 반드시 만점으로 적중한다!");
    showHit("student", "+HP MAX");
    const tip = await askArchangel({ courseName: dungeon.course, pp: battle.pp, score: battle.score });
    await wait(1400);
    if (!alive.current) return;
    setMessage(`대천사: "${tip}"`);
    setBusy(false);
  };

  const restart = () => {
    setBattle(initialState(skills));
    setResult(null);
    setBusy(false);
    setMessage(`${dungeon.professor} 교수님에게 다시 도전한다!`);
  };

  const saveGrade = () => {
    actions.saveResult(dungeon.id, { grade, score: result.score, success: result.success });
    toast.success(`${dungeon.course} 성적 ${grade} 기록 완료!`);
    navigate({ to: "/dungeons" });
  };

  return (
    <Layout
      title={dungeon.course}
      left={
        <S.BackLink as={Link} to="/dungeons" aria-label="던전 리스트로">
          <ChevronLeft />
        </S.BackLink>
      }
    >

      <S.Arena>
        {/* 교수님 정보 (좌상단) */}
        <S.InfoBox $side="enemy">
          <S.InfoName>
            {dungeon.professor} 교수님 <S.Boss>BOSS</S.Boss>
          </S.InfoName>
          <S.HpRow>
            <S.HpTag>HP</S.HpTag>
            <S.HpTrack>
              <S.HpFill style={{ width: `${profHp}%` }} $ratio={profHp / PROFESSOR_MAX_HP} />
              <S.ClearLine style={{ left: `${PROFESSOR_MAX_HP - CLEAR_LINE}%` }} />
            </S.HpTrack>
          </S.HpRow>
          <S.InfoSub>
            {profHp <= PROFESSOR_MAX_HP - CLEAR_LINE ? "토벌 가능 상태!" : `토벌선까지 ${(profHp - (PROFESSOR_MAX_HP - CLEAR_LINE)).toFixed(1)}`}
          </S.InfoSub>
        </S.InfoBox>

        {/* 교수님 (우상단) */}
        <S.EnemySpot>
          <S.Platform $side="enemy" />
          <S.Sprite
            key={hit.target === "prof" ? `p${hit.key}` : "prof"}
            src={prof.src}
            alt={`${dungeon.professor} 교수님`}
            width={816}
            height={816}
            $hit={hit.target === "prof"}
            $groggy={profHp <= PROFESSOR_MAX_HP - CLEAR_LINE}
          />
          {hit.target === "prof" && <S.Popup key={`pp${hit.key}`}>{hit.text}</S.Popup>}
        </S.EnemySpot>

        {/* 대천사 (학생 위, 1회) */}
        <S.Angel type="button" onClick={handleAngel} disabled={battle.angelUsed || locked} $used={battle.angelUsed} aria-label="대천사 사용">
          <S.AngelGlow $used={battle.angelUsed} />
          <S.AngelImg src={ANGEL.src} alt="대천사" width={816} height={816} />
          <S.AngelLabel $used={battle.angelUsed}>{battle.angelUsed ? "가호 완료" : "대천사 · 1회"}</S.AngelLabel>
        </S.Angel>

        {/* 학생 (좌하단) */}
        <S.HeroSpot>
          <S.Platform $side="hero" />
          <S.Sprite
            key={hit.target === "student" ? `s${hit.key}` : "hero"}
            src={hero.src}
            alt="나의 용사"
            width={816}
            height={816}
            $hit={hit.target === "student"}
            $hero
          />
          {hit.target === "student" && <S.Popup key={`sp${hit.key}`} $hero>{hit.text}</S.Popup>}
        </S.HeroSpot>

        {/* 학생 정보 (우하단) */}
        <S.InfoBox $side="hero">
          <S.InfoName>
            {user?.name ?? "용사"} <S.Lv>F급</S.Lv>
            {battle.blessed && <S.Blessed>가호</S.Blessed>}
          </S.InfoName>
          <S.HpRow>
            <S.HpTag>HP</S.HpTag>
            <S.HpTrack>
              <S.HpFill style={{ width: `${battle.studentHp}%` }} $ratio={battle.studentHp / STUDENT_MAX_HP} />
            </S.HpTrack>
          </S.HpRow>
          <S.InfoSub>
            {battle.studentHp}/{STUDENT_MAX_HP} · 누적 {battle.score.toFixed(1)}점
          </S.InfoSub>
        </S.InfoBox>
      </S.Arena>

      <S.MessageBox aria-live="polite">{message}</S.MessageBox>

      <S.Commands>
        {skills.map((skill) => {
          const left = battle.pp[skill.key];
          return (
            <S.SkillButton
              key={skill.key}
              type="button"
              $skill={skill.key}
              disabled={locked || left <= 0}
              onClick={() => handleSkill(skill)}
            >
              <S.SkillTop>
                <S.SkillName>{skill.name}</S.SkillName>
                <S.SkillType $skill={skill.key}>{skill.type}</S.SkillType>
              </S.SkillTop>
              <S.Balls aria-label={`남은 횟수 ${left}`}>
                {Array.from({ length: Math.min(skill.maxPP, MAX_BALLS) }).map((_, i) => (
                  <S.Ball key={i} $empty={i >= left} />
                ))}
                {skill.maxPP === 0 && <S.NoPP>평가 항목 없음</S.NoPP>}
              </S.Balls>
              <S.SkillBottom>
                <span>
                  PP {left}/{skill.maxPP}
                </span>
                <span>{isExam(skill.key) ? `최대 ${skill.ratio}` : `${skill.perHit.toFixed(1)}/회`}</span>
              </S.SkillBottom>
            </S.SkillButton>
          );
        })}
      </S.Commands>
      <S.Footnote>
        남은 스킬 {remaining}회 · 빼앗긴 점수 {battle.lost.toFixed(1)}점 · 토벌선 {CLEAR_LINE}점
      </S.Footnote>

      <Modal open={!!result} title={result?.success ? "토벌 성공!" : "토벌 실패..."}>
        {result && (
          <S.Result>
            <S.ResultImg src={prof.src} alt="" width={816} height={816} $success={result.success} />
            <S.ResultScore>
              최종 점수 <strong>{result.score}</strong>
            </S.ResultScore>
            <S.ResultDesc>
              {result.fainted
                ? "용사가 쓰러져서 토벌하지 못했어요."
                : result.success
                  ? `${dungeon.professor} 교수님을 토벌했어요!`
                  : "출석·과제 점수가 부족해서 토벌하지 못했어요."}
              <br />
              실제로 받은 성적을 기록해 주세요.
            </S.ResultDesc>
            <S.GradeGrid>
              {result.allowedGrades.map((g) => (
                <S.GradeOption key={g} type="button" $selected={grade === g} $success={result.success} onClick={() => setGrade(g)}>
                  {g}
                </S.GradeOption>
              ))}
            </S.GradeGrid>
            <C.Button type="button" $block onClick={saveGrade}>
              성적 {grade} 기록하기
            </C.Button>
            <C.Button type="button" $variant="ghost" $block onClick={restart}>
              다시 도전
            </C.Button>
          </S.Result>
        )}
      </Modal>
    </Layout>
  );
}
