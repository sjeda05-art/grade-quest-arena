import { useState } from "react";
import Modal from "../Modal/Modal";
import { PROFESSOR_AVATARS } from "../../data/characters";
import { SKILL_KEYS, SKILL_META, ratioTotal, buildSkills } from "../../lib/battle";
import * as C from "../common/Common.style";
import * as S from "./SyllabusForm.style";

const EMPTY = {
  course: "",
  professor: "",
  avatar: "prof1",
  ratio: { attendance: 10, assignment: 20, midterm: 30, final: 40 },
};

// 강의 계획표 입력 → 던전 생성/수정
export default function SyllabusForm({ open, initial, onClose, onSubmit, onDelete }) {
  const [form, setForm] = useState(initial ?? EMPTY);
  const [error, setError] = useState("");
  const total = ratioTotal(form.ratio);
  const skills = buildSkills(form.ratio);

  const setRatio = (key, value) => {
    const n = Math.max(0, Math.min(100, Number(value.replace(/[^0-9]/g, "")) || 0));
    setForm((f) => ({ ...f, ratio: { ...f.ratio, [key]: n } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.course.trim() || !form.professor.trim()) return setError("과목명과 교수님 이름을 입력해 주세요");
    if (total !== 100) return setError(`평가 비율의 합이 100%가 되어야 해요 (현재 ${total}%)`);
    setError("");
    onSubmit({ ...form, course: form.course.trim(), professor: form.professor.trim() });
  };

  return (
    <Modal open={open} title={initial ? "던전 수정" : "강의 계획표 입력"} onClose={onClose}>
      <S.Form onSubmit={handleSubmit}>
        <C.Row>
          <C.Field>
            과목명
            <C.Input value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="예) 일반물리학" />
          </C.Field>
          <C.Field>
            교수님
            <C.Input value={form.professor} onChange={(e) => setForm({ ...form, professor: e.target.value })} placeholder="예) 김교수" />
          </C.Field>
        </C.Row>

        <S.SectionLabel>교수님 캐릭터</S.SectionLabel>
        <S.Avatars>
          {PROFESSOR_AVATARS.map((a) => (
            <S.AvatarOption
              key={a.key}
              type="button"
              $selected={form.avatar === a.key}
              onClick={() => setForm({ ...form, avatar: a.key })}
              aria-label={a.label}
            >
              <img src={a.src} alt={a.label} loading="lazy" width={816} height={816} />
            </S.AvatarOption>
          ))}
        </S.Avatars>

        <S.SectionLabel>
          평가 비율 <S.Total $ok={total === 100}>합계 {total}%</S.Total>
        </S.SectionLabel>
        <S.RatioGrid>
          {SKILL_KEYS.map((key, i) => (
            <S.RatioCell key={key}>
              <S.RatioName>{SKILL_META[key].label}</S.RatioName>
              <S.RatioInput
                inputMode="numeric"
                value={form.ratio[key]}
                onChange={(e) => setRatio(key, e.target.value)}
                aria-label={`${SKILL_META[key].label} 비율`}
              />
              <S.RatioSkill>
                {SKILL_META[key].name} × {skills[i].maxPP}
              </S.RatioSkill>
            </S.RatioCell>
          ))}
        </S.RatioGrid>

        {error && <C.ErrorText>{error}</C.ErrorText>}

        <C.Button type="submit" $block>
          {initial ? "던전 수정 완료" : "던전 생성"}
        </C.Button>
        {initial && onDelete && (
          <C.Button type="button" $variant="danger" $block onClick={onDelete}>
            던전 삭제
          </C.Button>
        )}
      </S.Form>
    </Modal>
  );
}
