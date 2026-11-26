import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {apiMiddleware} from './api.mjs';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon','.json':'application/json','.woff2':'font/woff2','.txt':'text/plain'};
const server=createServer((req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','DENY');res.setHeader('Content-Security-Policy',"default-src 'self'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
 void apiMiddleware(req,res,()=>{void (async()=>{try { if(!['GET','HEAD'].includes(req.method)) {res.writeHead(405).end();return;} const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname); let file=resolve(root,'.'+path); if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;} if(!(await stat(file).catch(()=>null))?.isFile()){if(extname(path)){res.writeHead(404).end();return;}file=resolve(root,'index.html');} const body=await readFile(file);res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.setHeader('Cache-Control',file.startsWith(resolve(root,'assets')+sep)?'public,max-age=31536000,immutable':'no-cache');res.end(req.method==='HEAD'?undefined:body); }catch{res.writeHead(500).end('Server error');}})()});
});
server.listen(Number(process.env.PORT||3000),process.env.HOST||'0.0.0.0',()=>console.log('Indonesia Info ready'));
for(const signal of ['SIGTERM','SIGINT']) process.on(signal,()=>server.close(()=>process.exit(0)));
