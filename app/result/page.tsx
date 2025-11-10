'use client';
import { useEffect, useState } from 'react';
import { bandLSNS6 } from '@/lib/band';

export default function ResultPage(){
  const [total, setTotal] = useState<number|null>(null);
  const [dims, setDims] = useState<any>(null);

  useEffect(()=>{
    try{
      const raw = sessionStorage.getItem('lsns6_result');
      if (!raw) return;
      const { total, dimensions } = JSON.parse(raw);
      setTotal(total); setDims(dimensions);
    }catch{}
  },[]);

  if (total==null) return <main className="p-6">결과 정보가 없습니다. <a href="/test" className="underline">다시 테스트</a></main>;

  const band = bandLSNS6(total);

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">진단 결과</h2>
      <div className="p-4 rounded border">
        <div className="text-3xl font-bold">{total} / 30</div>
        <div className="mt-1 font-medium" style={{color:band.color}}>{band.label}</div>
        <div className="mt-2 text-sm text-gray-600">
          가족 합계: {dims?.family ?? '-'} / 친구 합계: {dims?.friends ?? '-'}
        </div>
      </div>
      <div className="mt-6 text-sm leading-6 text-gray-700">
        • 본 결과는 참고용이며, 정식 상담·지원이 필요한 경우 지역 사회복지관/청년센터 상담 창구를 이용하세요.<br/>
        • 점수대 해석 기준은 예시로 설정되었으며(확실하지 않음), 기관/연구에 따라 상이할 수 있습니다.
      </div>
      <a href="/test" className="inline-block mt-6 underline">다시 테스트</a>
    </main>
  );
}

