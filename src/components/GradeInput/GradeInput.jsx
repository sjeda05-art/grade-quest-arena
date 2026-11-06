import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Modal from "../Modal/Modal";
import { GRADE_ORDER } from "../../lib/grades";
import * as C from "../common/Common.style";
import * as S from "./GradeInput.style";

const EMPTY = Object.fromEntries(GRADE_ORDER.map((g) => [g, 0]));

// 전투력 측정을 위한 기존 성적(등급별 과목 수) 수동 입력
export default function GradeInput({ open, initial, onClose, onSave }) {
  const [counts, setCounts] = useState(initial ?? EMPTY);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const change = (g, d) => setCounts((c) => ({ ...c, [g]: Math.max(0, Math.min(30, c[g] + d)) }));

  return (
    <Modal open={open} title="지난 성적 입력" onClose={onClose}>
      <S.Desc>받았던 성적별 과목 수를 입력하면 성적 비율에 맞춰 전투력이 측정돼요.</S.Desc>
      <S.Grid>
        {GRADE_ORDER.map((g) => (
          <S.Cell key={g}>
            <S.Grade $grade={g}>{g}</S.Grade>
            <S.Stepper>
              <S.Step type="button" aria-label={`${g} 줄이기`} onClick={() => change(g, -1)}>
                <Minus />
              </S.Step>
              <S.Count>{counts[g]}</S.Count>
              <S.Step type="button" aria-label={`${g} 늘리기`} onClick={() => change(g, 1)}>
                <Plus />
              </S.Step>
            </S.Stepper>
          </S.Cell>
        ))}
      </S.Grid>
      <C.Button $block disabled={total === 0} onClick={() => onSave(counts)}>
        전투력 측정하기 ({total}과목)
      </C.Button>
    </Modal>
  );
}
