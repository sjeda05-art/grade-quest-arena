import { CLEAR_LINE, FAIL_GRADES, SUCCESS_GRADES, scoreToGrade } from "./grades";

export const PROFESSOR_MAX_HP = 100;
export const STUDENT_MAX_HP = 100;

export const SKILL_KEYS = ["attendance", "assignment", "midterm", "final"];

export const SKILL_META = {
  attendance: { name: "출석 체크", label: "출결", type: "노말", hint: "확정 데미지" },
  assignment: { name: "과제 어택", label: "과제", type: "격투", hint: "확정 데미지" },
  midterm: { name: "중간고사 크래시", label: "중간", type: "에스퍼", hint: "명중 60~100%" },
  final: { name: "기말고사 피니시", label: "기말", type: "드래곤", hint: "명중 60~100%" },
};

const roundTo = (n, d = 1) => Math.round(n * 10 ** d) / 10 ** d;

/**
 * 강의 계획표 비율 → 스킬 사용 횟수(PP)와 1회 데미지
 * - 출석 체크: 비율 2점당 1회 (최대 10회)
 * - 과제 어택: 비율 5점당 1회 (최대 6회)
 * - 중간/기말: 1회, 최대 데미지 = 비율
 * 모든 스킬을 다 맞히면 정확히 100 데미지 = 교수님 HP
 */
export function buildSkills(ratio) {
  const count = (value, unit, max) => (value > 0 ? Math.min(max, Math.max(1, Math.round(value / unit))) : 0);
  const pp = {
    attendance: count(ratio.attendance, 2, 10),
    assignment: count(ratio.assignment, 5, 6),
    midterm: ratio.midterm > 0 ? 1 : 0,
    final: ratio.final > 0 ? 1 : 0,
  };
  return SKILL_KEYS.map((key) => ({
    key,
    ...SKILL_META[key],
    ratio: ratio[key],
    maxPP: pp[key],
    perHit: pp[key] > 0 ? ratio[key] / pp[key] : 0,
  }));
}

export function ratioTotal(ratio) {
  return SKILL_KEYS.reduce((sum, k) => sum + Number(ratio[k] || 0), 0);
}

// 시험 스킬 데미지: 대천사의 가호 또는 15% 급소 → 만점, 그 외 60~100%
export function examDamage(ratioValue, rng = Math.random, blessed = false) {
  if (blessed) return { damage: ratioValue, crit: true };
  if (rng() < 0.15) return { damage: ratioValue, crit: true };
  return { damage: roundTo(ratioValue * (0.6 + rng() * 0.4)), crit: false };
}

export function skillDamage(skill, rng = Math.random, blessed = false) {
  if (skill.key === "midterm" || skill.key === "final") return examDamage(skill.ratio, rng, blessed);
  return { damage: roundTo(skill.perHit, 2), crit: false };
}

const PROFESSOR_MOVES = [
  { id: "quiz", name: "기습 퀴즈", weight: 30, min: 5, max: 9 },
  { id: "teamplay", name: "팀플 폭탄", weight: 25, min: 8, max: 12 },
  { id: "pressure", name: "학점 압박", weight: 20, min: 3, max: 6 },
  { id: "rollcall", name: "출석 호명", weight: 15, steal: "attendance", min: 0, max: 0 },
  { id: "deadline", name: "과제 마감 폭격", weight: 10, steal: "assignment", min: 4, max: 6 },
];

/**
 * 교수님의 반격. 출석 호명/과제 마감은 이번 턴에 해당 스킬을 쓰지 않았으면
 * PP를 1 빼앗아 (결석/미제출 처리) 영구히 점수를 잃게 만듭니다.
 */
export function professorMove({ pp, usedKey }, rng = Math.random) {
  const total = PROFESSOR_MOVES.reduce((s, m) => s + m.weight, 0);
  let pick = rng() * total;
  const move = PROFESSOR_MOVES.find((m) => (pick -= m.weight) < 0) ?? PROFESSOR_MOVES[0];
  const dmg = (m) => m.min + Math.floor(rng() * (m.max - m.min + 1));

  if (move.steal) {
    const label = move.steal === "attendance" ? "결석" : "미제출";
    if (pp[move.steal] > 0 && usedKey !== move.steal) {
      return { ...move, damage: 0, stolen: move.steal, text: `${move.name}! ${label} 처리되어 ${SKILL_META[move.steal].name} PP -1` };
    }
    if (move.steal === "attendance") {
      return { ...move, damage: 0, stolen: null, text: `${move.name}! 하지만 용사는 이미 출석했다!` };
    }
    const d = dmg(move);
    return { ...move, damage: d, stolen: null, text: `${move.name}! 용사는 ${d} 데미지를 입었다` };
  }
  const d = dmg(move);
  return { ...move, damage: d, stolen: null, text: `${move.name}! 용사는 ${d} 데미지를 입었다` };
}

// 토벌 결과: 성공(A+~B0) / 실패(C+~F)
export function evaluateBattle({ score, fainted }) {
  const success = !fainted && score >= CLEAR_LINE;
  const capped = success ? score : Math.min(score, CLEAR_LINE - 0.1);
  return {
    success,
    score: roundTo(score),
    suggestedGrade: scoreToGrade(capped),
    allowedGrades: success ? SUCCESS_GRADES : FAIL_GRADES,
  };
}
