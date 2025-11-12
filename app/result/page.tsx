'use client';
import { useEffect, useState } from 'react';
import { bandLSNS6 } from '@/lib/lsns6';

export default function ResultPage() {
  const [total, setTotal] = useState<number|null>(null);
  const [dims, setDims]   = useState<{family:number; friends:number}|null>(null);

  useEffect(()=>{
    try {
      const raw = sessionStorage.getItem('lsns6_result');
      if (!raw) return;
      const { total, dimensions } = JSON.parse(raw);
      setTotal(total); setDims(dimensions);
    } catch {}
  },[]);

  if (total==null) {
    return <main style={{padding:24}}>결과 정보가 없습니다. <a href="/test">다시 테스트</a></main>;
  }

  const band = bandLSNS6(total);

  return (
    <main style={{maxWidth:720, margin:'0 auto', padding:24}}>
      <h1 style={{fontSize:24, fontWeight:700, marginBottom:12}}>진단 결과</h1>
      <div style={{border:'1px solid #ddd', borderRadius:8, padding:16}}>
        <div style={{fontSize:36, fontWeight:800}}>{total} / 30</div>
        <div style={{marginTop:4, fontWeight:700, color:band.color}}>{band.label}</div>
        <div style={{marginTop:8, color:'#666', fontSize:13}}>
          가족 합계: {dims?.family ?? '-'} / 친구 합계: {dims?.friends ?? '-'}
        </div>
      </div>
      <div style={{marginTop:16, color:'#666', fontSize:13, lineHeight:1.7}}>
        • 본 결과는 참고용이며, 정식 상담·지원이 필요한 경우 지역 사회복지관/청년센터 상담 창구를 이용하세요.<br/>
        • 점수대 해석 기준은 예시이며(확실하지 않음), 기관/연구에 따라 상이할 수 있습니다.
      </div>
      <a href="/test" style={{display:'inline-block', marginTop:16}}>다시 테스트</a>
    </main>
  );
}
