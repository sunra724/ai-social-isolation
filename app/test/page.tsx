'use client';
import { useState } from 'react';
import { LSNS6_ITEMS, scoreLSNS6 } from '@/lib/lsns6';
import { useRouter } from 'next/navigation';

export default function TestPage(){
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const submit = async ()=>{
    const { total, dimensions } = scoreLSNS6(answers);
    setSubmitting(true);
    await fetch('/api/submit', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ module:'lsns6', total, dimensions, answers })
    }).catch(()=>{});
    sessionStorage.setItem('lsns6_result', JSON.stringify({ total, dimensions }));
    router.push('/result');
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">사회적 고립 자가진단</h2>
      <ol className="space-y-4">
        {LSNS6_ITEMS.map(it=>(
          <li key={it.id}>
            <p className="mb-2">{it.text}</p>
            <input type="range" min={it.min} max={it.max}
              value={answers[it.id] ?? 0}
              onChange={e=>setAnswers(a=>({...a, [it.id]: Number(e.target.value)}))}
              className="w-full" />
            <div className="text-sm text-gray-600">선택값: {answers[it.id] ?? 0}</div>
          </li>
        ))}
      </ol>
      <button disabled={submitting} onClick={submit}
        className="mt-6 px-4 py-2 rounded bg-black text-white">
        {submitting ? '제출 중…' : '결과 보기'}
      </button>
    </main>
  );
}

