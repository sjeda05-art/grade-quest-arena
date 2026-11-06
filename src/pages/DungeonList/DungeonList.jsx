import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Pencil, Sparkles } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import SyllabusForm from "../../components/SyllabusForm/SyllabusForm";
import { useGameStore, actions } from "../../lib/gameStore";
import { SKILL_KEYS, SKILL_META } from "../../lib/battle";
import { getProfessorAvatar } from "../../data/characters";
import * as C from "../../components/common/Common.style";
import * as S from "./DungeonList.style";

export default function DungeonList() {
  const dungeons = useGameStore((s) => s.dungeons);
  // null: 닫힘 / "new": 생성 / dungeon 객체: 수정
  const [editing, setEditing] = useState(null);

  const closeForm = () => setEditing(null);

  return (
    <Layout
      title="던전 리스트"
      right={
        <S.CreateButton type="button" onClick={() => setEditing("new")} aria-label="던전 생성">
          <Plus />
        </S.CreateButton>
      }
    >
      {dungeons.length === 0 ? (
        <S.Empty>
          <S.EmptyTitle>아직 던전이 없어요</S.EmptyTitle>
          <S.EmptyText>강의 계획표를 입력하면 교수님 던전이 생성돼요.</S.EmptyText>
          <C.Button type="button" $block onClick={() => setEditing("new")}>
            <Plus /> 강의 계획표 입력하기
          </C.Button>
          <C.Button type="button" $variant="mint" $block onClick={() => actions.loadSampleDungeons()}>
            <Sparkles /> 체험용 던전 불러오기
          </C.Button>
        </S.Empty>
      ) : (
        <>
          <S.Toolbar>
            <C.Button type="button" $variant="ghost" onClick={() => setEditing("new")}>
              <Plus /> 던전 생성
            </C.Button>
          </S.Toolbar>
          <S.List>
            {dungeons.map((d) => {
              const avatar = getProfessorAvatar(d.avatar);
              const status = d.result ? (d.result.success ? "success" : "fail") : "ready";
              return (
                <S.Card key={d.id}>
                  <S.CardLink as={Link} to="/dungeons/$id" params={{ id: d.id }}>
                    <S.Portrait>
                      <img src={avatar.src} alt={`${d.professor} 교수님`} loading="lazy" width={816} height={816} />
                    </S.Portrait>
                    <S.Info>
                      <S.Course>{d.course}</S.Course>
                      <S.Professor>{d.professor} 교수님</S.Professor>
                      <S.Chips>
                        {SKILL_KEYS.map((k) => (
                          <S.Chip key={k}>
                            {SKILL_META[k].label} {d.ratio[k]}
                          </S.Chip>
                        ))}
                      </S.Chips>
                    </S.Info>
                    <S.Status $status={status}>
                      {status === "ready" ? "도전" : d.result.grade}
                      <small>{status === "ready" ? "미토벌" : status === "success" ? "토벌 성공" : "토벌 실패"}</small>
                    </S.Status>
                  </S.CardLink>
                  <S.EditButton type="button" onClick={() => setEditing(d)} aria-label={`${d.course} 던전 수정`}>
                    <Pencil /> 수정
                  </S.EditButton>
                </S.Card>
              );
            })}
          </S.List>
        </>
      )}

      {editing && (
        <SyllabusForm
          open
          initial={editing === "new" ? null : editing}
          onClose={closeForm}
          onSubmit={(data) => {
            if (editing === "new") actions.createDungeon(data);
            else actions.updateDungeon(editing.id, data);
            closeForm();
          }}
          onDelete={
            editing !== "new"
              ? () => {
                  actions.deleteDungeon(editing.id);
                  closeForm();
                }
              : undefined
          }
        />
      )}
    </Layout>
  );
}
