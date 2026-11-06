import { describe, expect, it } from "vitest";
import { buildSkills, evaluateBattle, professorMove } from "./battle";
import { FAIL_GRADES, SUCCESS_GRADES, scoreToGrade } from "./grades";

describe("스킬 횟수는 강의 계획표 비율로 정해진다", () => {
  it("출결 20% → 출석 체크 10회, 과제 20% → 과제 어택 4회, 시험은 각 1회", () => {
    const skills = buildSkills({ attendance: 20, assignment: 20, midterm: 30, final: 30 });
    const pp = Object.fromEntries(skills.map((s) => [s.key, s.maxPP]));
    expect(pp).toEqual({ attendance: 10, assignment: 4, midterm: 1, final: 1 });
  });

  it("비율이 0인 항목은 스킬을 쓸 수 없다", () => {
    const skills = buildSkills({ attendance: 0, assignment: 0, midterm: 50, final: 50 });
    expect(skills.find((s) => s.key === "attendance").maxPP).toBe(0);
    expect(skills.find((s) => s.key === "assignment").maxPP).toBe(0);
  });

  it("모든 스킬을 다 맞히면 비율 합계(100)만큼만 공격된다", () => {
    const skills = buildSkills({ attendance: 15, assignment: 25, midterm: 25, final: 35 });
    const total = skills.reduce((sum, s) => sum + s.perHit * s.maxPP, 0);
    expect(total).toBeCloseTo(100);
  });
});

describe("토벌 성공/실패 판정", () => {
  it("80점 이상이면 토벌 성공, 성적은 A+~B0 중에서 고른다", () => {
    const r = evaluateBattle({ score: 82, fainted: false });
    expect(r.success).toBe(true);
    expect(r.allowedGrades).toEqual(["A+", "A0", "B+", "B0"]);
    expect(r.suggestedGrade).toBe("B0");
  });

  it("80점 미만이면 토벌 실패, 성적은 C+~F 중에서 고른다", () => {
    const r = evaluateBattle({ score: 72, fainted: false });
    expect(r.success).toBe(false);
    expect(r.allowedGrades).toEqual(["C+", "C0", "D+", "D0", "F"]);
    expect(r.suggestedGrade).toBe("C0");
  });

  it("용사가 쓰러지면 점수가 높아도 토벌 실패", () => {
    const r = evaluateBattle({ score: 90, fainted: true });
    expect(r.success).toBe(false);
    expect(FAIL_GRADES).toContain(r.suggestedGrade);
  });

  it("점수→성적 구간", () => {
    expect(scoreToGrade(95)).toBe("A+");
    expect(scoreToGrade(90)).toBe("A0");
    expect(scoreToGrade(85)).toBe("B+");
    expect(scoreToGrade(80)).toBe("B0");
    expect(scoreToGrade(79.9)).toBe("C+");
    expect(scoreToGrade(59)).toBe("F");
    expect(SUCCESS_GRADES).not.toContain("C+");
  });
});

describe("교수님 반격", () => {
  it("출석 호명은 이번 턴에 출석하지 않았으면 출석 PP를 빼앗는다", () => {
    // rng 0.8 → 누적 가중치 75~90 구간 = 출석 호명
    const move = professorMove({ pp: { attendance: 3, assignment: 2 }, usedKey: "assignment" }, () => 0.8);
    expect(move.id).toBe("rollcall");
    expect(move.stolen).toBe("attendance");
  });

  it("이번 턴에 출석 체크를 했으면 호명을 피한다", () => {
    const move = professorMove({ pp: { attendance: 3, assignment: 2 }, usedKey: "attendance" }, () => 0.8);
    expect(move.stolen).toBe(null);
  });
});
