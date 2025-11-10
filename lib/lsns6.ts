// 6문항: 가족 3, 친구 3. 각 0~5점. 총점 0~30 (낮을수록 고립 위험↑).
export const LSNS6_ITEMS = [
  { id:'fam-size', text:'정기적으로 연락하는 가족(본인 제외) 수는?', min:0, max:5 },
  { id:'fam-talk', text:'지난달 가족과 대화/만남 빈도는?', min:0, max:5 },
  { id:'fam-support', text:'필요시 도움을 줄 가족 수는?', min:0, max:5 },
  { id:'fri-size', text:'정기적으로 연락하는 친구/지인 수는?', min:0, max:5 },
  { id:'fri-talk', text:'지난달 친구/지인과 대화/만남 빈도는?', min:0, max:5 },
  { id:'fri-support', text:'필요시 도움을 줄 친구/지인 수는?', min:0, max:5 },
] as const;

export function scoreLSNS6(answers: Record<string, number>){
  const dims = { family: 0, friends: 0 };
  for (const it of LSNS6_ITEMS){
    const v = Number(answers[it.id] ?? 0);
    if (String(it.id).startsWith('fam')) dims.family += v;
    else dims.friends += v;
  }
  const total = dims.family + dims.friends; // 0~30
  return { total, dimensions: dims };
}

