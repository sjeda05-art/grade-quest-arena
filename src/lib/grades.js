export const GRADE_ORDER = ["A+", "A0", "B+", "B0", "C+", "C0", "D+", "D0", "F"];

export const GRADE_POINT = {
  "A+": 4.5,
  A0: 4.0,
  "B+": 3.5,
  B0: 3.0,
  "C+": 2.5,
  C0: 2.0,
  "D+": 1.5,
  D0: 1.0,
  F: 0,
};

// 토벌 성공: A+ ~ B0 / 토벌 실패: C+ ~ F
export const SUCCESS_GRADES = ["A+", "A0", "B+", "B0"];
export const FAIL_GRADES = ["C+", "C0", "D+", "D0", "F"];

// 토벌 라인 (B0 커트라인)
export const CLEAR_LINE = 80;

export function scoreToGrade(score) {
  if (score >= 95) return "A+";
  if (score >= 90) return "A0";
  if (score >= 85) return "B+";
  if (score >= 80) return "B0";
  if (score >= 75) return "C+";
  if (score >= 70) return "C0";
  if (score >= 65) return "D+";
  if (score >= 60) return "D0";
  return "F";
}

export const isSuccessGrade = (grade) => SUCCESS_GRADES.includes(grade);

// 전투력: 입력한 기존 성적 + 던전에서 기록한 성적의 평균 평점으로 계산
export function calcPower(baseGrades, dungeons = []) {
  const points = [];
  if (baseGrades) {
    GRADE_ORDER.forEach((g) => {
      const n = Number(baseGrades[g] || 0);
      for (let i = 0; i < n; i += 1) points.push(GRADE_POINT[g]);
    });
  }
  dungeons.forEach((d) => {
    if (d.result?.grade) points.push(GRADE_POINT[d.result.grade]);
  });
  if (points.length === 0) return null;
  const avg = points.reduce((a, b) => a + b, 0) / points.length;
  return {
    power: Math.round((avg / 4.5) * 9000 + points.length * 120),
    avg: Math.round(avg * 100) / 100,
    count: points.length,
  };
}
