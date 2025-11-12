// 0~5점 × 6문항 = 총점 0~30 (낮을수록 고립 위험↑)
export const LSNS6_ITEMS = [
  { id:'fam-size',    text:'정기적으로 연락하는 가족(본인 제외) 수는?', min:0, max:5 },
  { id:'fam-talk',    text:'지난달 가족과 대화/만남 빈도는?',           min:0, max:5 },
  { id:'fam-support', text:'필요 시 도움을 줄 가족 수는?',               min:0, max:5 },
  { id:'fri-size',    text:'정기적으로 연락하는 친구/지인 수는?',         min:0, max:5 },
  { id:'fri-talk',    text:'지난달 친구/지인과 대화/만남 빈도는?',         min:0, max:5 },
  { id:'fri-support', text:'필요 시 도움을 줄 친구/지인 수는?',           min:0, max:5 },
] as const;

export function scoreLSNS6(answers: Record<string, number>) {
  const dims = { family: 0, friends: 0 };
  for (const it of LSNS6_ITEMS) {
    const v = Number(answers[it.id] ?? 0);
    (it.id.startsWith('fam') ? (dims.family += v) : (dims.friends += v));
  }
  const total = dims.family + dims.friends; // 0~30
  return { total, dimensions: dims };
}

export function bandLSNS6(total: number) {
  // 참고용 기준(기관·연구마다 다름 → 확실하지 않음)
  if (total <= 11) return { label: '고립 위험', color: 'red' };
  if (total <= 17) return { label: '주의',     color: 'orange' };
  return { label: '양호', color: 'green' };
}
