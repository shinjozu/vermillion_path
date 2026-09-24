import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {AIService} from './ai.mjs';
import {allowedOrigins} from './server-origin.mjs';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'public');
const ai=new AIService({dir:path.join(root,'../.runtime')});
const port=Number(process.env.PORT||4317),host='127.0.0.1';
const allowed=allowedOrigins(port,process.env.PUBLIC_GAME_URL||'');
const types={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.webp':'image/webp'};
export const server=http.createServer(async(req,res)=>{
 const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Cache-Control':'no-store','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"};
 const send=(code,data,type='application/json')=>{if(!res.destroyed){res.writeHead(code,{...headers,'Content-Type':type});res.end(type==='application/json'?JSON.stringify(data):data);}};
 try{
 if(!allowed.hosts.has(req.headers.host))return send(403,{error:'Host not allowed.'});
 if(req.headers.origin&&!allowed.origins.has(req.headers.origin))return send(403,{error:'Origin not allowed.'});
 const url=new URL(req.url,'http://127.0.0.1');
 if(url.pathname==='/api/status'&&req.method==='GET')return send(200,await ai.status());
 if(url.pathname==='/api/ai'&&req.method==='POST'){
 if(req.headers['x-vermilion-client']!=='1'||!req.headers['content-type']?.startsWith('application/json'))return send(403,{error:'Invalid client request.'});
 let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>1100000)return send(413,{error:'Request too large.'});}
 const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});
 try{return send(200,await ai.request(JSON.parse(raw),controller.signal));}catch(e){return send(400,{error:e.name==='AbortError'?'AI cancelled or timed out. State unchanged.':e.message});}
 }
 if(req.method!=='GET')return send(405,{error:'Method not allowed.'});
 const decoded=decodeURIComponent(url.pathname);const file=path.resolve(root,'.'+(decoded==='/'?'/index.html':decoded));
 if(!file.startsWith(root+path.sep))return send(403,{error:'Not allowed.'});
 const ext=path.extname(file);if(!types[ext])return send(404,{error:'Not found.'});
 try{send(200,await readFile(file),types[ext]);}catch{send(404,{error:'Not found.'});}
 }catch{send(400,{error:'Invalid request.'});}
});
server.listen(port,host,()=>console.log(`Vermilion Path: http://${host}:${port}`));
