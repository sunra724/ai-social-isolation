'use client';
import { useState } from 'react';
import { LSNS6_ITEMS, scoreLSNS6 } from '@/lib/lsns6';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const submit = async () => {
    const { total, dimensions } = scoreLSNS6(answers);
    setSending(true);
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ module:'lsns6', total, dimensions, answers }),
      });
    } catch {}
    sessionStorage.setItem('lsns6_result', JSON.stringify({ total, dimensions }));
    router.push('/result');
  };

  return (
    <main style={{maxWidth: 720, margin: '0 auto', padding: 24}}>
      <h1 style={{fontSize: 24, fontWeight: 700, marginBottom: 12}}>
        청년 사회적고립 자가진단
      </h1>
      <p style={{color:'#666', marginBottom: 16}}>
        본 도구는 참고용이며 의료적 진단이 아닙니다. 개인 식별정보는 수집하지 않습니다.
      </p>
      <ol style={{display:'grid', gap:16}}>
        {LSNS6_ITEMS.map(it=>(
          <li key={it.id}>
            <div style={{marginBottom:8}}>{it.text}</div>
            <input type="range" min={it.min} max={it.max}
              value={answers[it.id] ?? 0}
              onChange={e => setAnswers(a=>({...a, [it.id]: Number(e.target.value)}))}
              style={{width:'100%'}}/>
            <div style={{fontSize:12, color:'#666'}}>선택값: {answers[it.id] ?? 0}</div>
          </li>
        ))}
      </ol>
      <button onClick={submit} disabled={sending}
        style={{marginTop:20, padding:'10px 16px', borderRadius:8, background:'#111', color:'#fff'}}>
        {sending ? '제출 중…' : '결과 보기'}
      </button>
    </main>
  );
}
