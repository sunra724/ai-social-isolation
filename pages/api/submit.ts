import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const endpoint = process.env.APPS_SCRIPT_ENDPOINT;
    if (!endpoint) return res.status(200).json({ ok:true, saved:'skipped(no endpoint)' });
    const r = await fetch(endpoint, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(req.body)
    });
    const data = await r.json().catch(()=>({}));
    return res.status(200).json(data);
  } catch (e:any) {
    return res.status(500).json({ ok:false, error:String(e) });
  }
}
