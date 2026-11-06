import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Zap, LogOut } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import GradeInput from "../../components/GradeInput/GradeInput";
import { useGameStore, actions } from "../../lib/gameStore";
import { calcPower } from "../../lib/grades";
import { getStudentAvatar } from "../../data/characters";
import * as S from "./Home.style";

export default function Home() {
  const { user, baseGrades, dungeons } = useGameStore();
  const [gradeOpen, setGradeOpen] = useState(false);
  const power = calcPower(baseGrades, dungeons);
  const hero = getStudentAvatar(user?.avatar);
  const cleared = dungeons.filter((d) => d.result?.success).length;
  const needsGrades = !power;

  return (
    <Layout hideNav={false}>
      <S.TopBar>
        <S.PowerBadge type="button" onClick={() => setGradeOpen(true)}>
          <Zap />
          <S.PowerLabel>전투력</S.PowerLabel>
          <S.PowerValue>{power ? power.power.toLocaleString() : "???"}</S.PowerValue>
        </S.PowerBadge>
        <S.LogoutButton type="button" aria-label="로그아웃" onClick={() => actions.logout()}>
          <LogOut />
        </S.LogoutButton>
      </S.TopBar>

      {needsGrades && (
        <S.Notice>
          아직 전투력이 없어요!
          <S.NoticeButton type="button" onClick={() => setGradeOpen(true)}>
            성적 입력하고 측정하기
          </S.NoticeButton>
        </S.Notice>
      )}

      <S.Stage>
        <S.Bubble>{cleared > 0 ? `교수님 ${cleared}명 토벌 완료!` : "오늘은 어느 던전을 토벌할까?"}</S.Bubble>
        <S.Character src={hero.src} alt={hero.label} width={816} height={816} />
        <S.Platform />
        <S.NameTag>
          <S.Rank>F급 용사</S.Rank>
          {user?.name ?? "용사"}
        </S.NameTag>
      </S.Stage>

      <S.Stats>
        <S.Stat>
          <S.StatValue>{dungeons.length}</S.StatValue>
          <S.StatLabel>던전</S.StatLabel>
        </S.Stat>
        <S.Stat>
          <S.StatValue>{cleared}</S.StatValue>
          <S.StatLabel>토벌 성공</S.StatLabel>
        </S.Stat>
        <S.Stat>
          <S.StatValue>{power ? power.avg.toFixed(2) : "-"}</S.StatValue>
          <S.StatLabel>평균 평점</S.StatLabel>
        </S.Stat>
      </S.Stats>

      <S.EnterButton as={Link} to="/dungeons">
        던전으로 출발
      </S.EnterButton>

      <GradeInput
        key={gradeOpen ? "open" : "closed"}
        open={gradeOpen}
        initial={baseGrades}
        onClose={() => setGradeOpen(false)}
        onSave={(counts) => {
          actions.setBaseGrades(counts);
          setGradeOpen(false);
        }}
      />
    </Layout>
  );
}
