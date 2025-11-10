import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
  if (req.method !== 'POST') return res.status(405).end();
  try{
    const endpoint = process.env.APPS_SCRIPT_ENDPOINT!;
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.status(200).json(data);
  }catch(e:any){
    res.status(500).json({ ok:false, error:String(e) });
  }
}
