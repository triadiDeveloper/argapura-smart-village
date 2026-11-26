const cache = new Map(), pending = new Map();
let bmkgCalls = [];
const regionBase = 'https://www.emsifa.com/api-wilayah-indonesia/v2';
export function resolveApi(url) {
  const p = url.searchParams, route = url.pathname;
  if (route === '/api/news') { const category = p.get('category') || 'terbaru'; if (!['terbaru','politik','ekonomi','tekno','olahraga','humaniora','dunia'].includes(category)) return; return [`https://api-berita-indonesia.vercel.app/antara/${category}`, 300]; }
  if (route === '/api/weather') { const code = p.get('adm4') || '31.71.03.1001'; if (!/^\d{2}\.\d{2}\.\d{2}\.\d{4}$/.test(code)) return; return [`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${code}`, 900]; }
  if (route === '/api/earthquake') return ['https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',60];
  if (route === '/api/earthquakes') return ['https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json',60];
  if (route === '/api/holidays') { const year = p.get('year') || String(new Date().getFullYear()); if (!/^20[2-3]\d$/.test(year)) return; return [`https://dayoffapi.vercel.app/api?year=${year}`,3600]; }
  if (route === '/api/currency') return ['https://api.frankfurter.dev/v1/latest?base=USD&symbols=IDR,EUR,JPY,SGD,MYR,AUD',1800];
  if (route === '/api/regions') { const level=p.get('level')||'provinces', id=p.get('id')||''; if(level==='provinces' && !id) return [`${regionBase}/provinces.json`,86400]; if(['regencies','districts','villages','postal-codes'].includes(level) && /^\d{2}(?:\.\d{2}){0,2}$|^\d{5}$/.test(id)) return [`${regionBase}/${level}/${id}.json`,86400]; }
}
export async function apiMiddleware(req,res,next) {
  const url = new URL(req.url, 'http://localhost');
  if (!url.pathname.startsWith('/api/')) return next();
  const send = (status, body) => { res.statusCode=status; res.setHeader('Content-Type','application/json; charset=utf-8'); res.setHeader('Cache-Control','no-store'); res.end(JSON.stringify(body)); };
  if(req.method!=='GET') return send(405,{error:'Method not allowed'});
  if(url.pathname==='/api/health') return send(200,{status:'ok'});
  const target=resolveApi(url); if(!target) return send(400,{error:'Endpoint atau parameter tidak valid'});
  const [key,ttl]=target, old=cache.get(key);
  if(old && Date.now()-old.fetchedAt < ttl*1000) return send(200,{...old,stale:false});
  try {
    if(!pending.has(key)) {
      if(pending.size>=20) throw Error('Busy');
      if(key.includes('bmkg.go.id')) { bmkgCalls=bmkgCalls.filter(t=>Date.now()-t<60000); if(bmkgCalls.length>=50) throw Error('Rate limited'); bmkgCalls.push(Date.now()); }
      const task=(async()=>{ const response=await fetch(key,{signal:AbortSignal.timeout(10000),redirect:'error',headers:{Accept:'application/json'}}); if(!response.ok) throw Error(`Upstream ${response.status}`); const data=await response.json(); const result={data,fetchedAt:Date.now()}; if(cache.size>=250) cache.delete(cache.keys().next().value); cache.set(key,result); return result; })();
      pending.set(key,task); task.finally(()=>pending.delete(key)).catch(()=>{});
    }
    return send(200,{...await pending.get(key),stale:false});
  } catch(error) { console.warn('Upstream unavailable',url.pathname,String(error)); if(old && Date.now()-old.fetchedAt<86400000) return send(200,{...old,stale:true}); return send(503,{error:'Sumber data sedang tidak tersedia. Coba lagi nanti.'}); }
}
