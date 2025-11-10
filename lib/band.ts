// 예시 밴드 (참고·가이드용, 확실하지 않음: 문헌/기관 따라 상이)
export function bandLSNS6(total:number){
  if (total <= 11) return { label:'고립 위험', color:'red' };
  if (total <= 17) return { label:'주의', color:'orange' };
  return { label:'양호', color:'green' };
}

