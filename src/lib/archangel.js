/**
 * 대천사 (수호 천사) - 전투당 1회
 * 지금은 상황별 고정 조언을 돌려줍니다.
 * TODO: 여기에 AI 기능을 연결할 예정 (전투 상황을 넘겨 맞춤 조언 받기)
 */
export async function askArchangel({ courseName, pp, score }) {
  if (pp.assignment > 0) return `「${courseName}」 과제는 미루면 빼앗겨요. 과제 어택부터 끝내 두세요!`;
  if (pp.attendance > 0) return "출석은 꾸준함이 무기예요. 호명당하기 전에 출석 체크!";
  if (score < 80) return "시험 한 방이 남았어요. 가호를 받은 지금이 기회예요!";
  return "이미 토벌 라인을 넘었어요. 끝까지 침착하게!";
}
