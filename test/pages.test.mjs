import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
test('static game assets and navigation stay within the repository path',async()=>{
 const html=await readFile(new URL('../public/index.html',import.meta.url),'utf8');
 const app=await readFile(new URL('../public/app.mjs',import.meta.url),'utf8');
 assert.ok(html.includes('href="./"'));
 assert.doesNotMatch(html,/(?:src|href)=["']\//);
 assert.doesNotMatch(app,/(?:src=["']|url\(["'])\/assets/);
 for(const file of await readdir(new URL('../public/',import.meta.url))){
  if(!file.endsWith('.mjs'))continue;
  const source=await readFile(new URL('../public/'+file,import.meta.url),'utf8');
  for(const match of source.matchAll(/from ['"](\.\/[^'"]+)['"]/g))await readFile(new URL('../public/'+match[1],import.meta.url));
 }
});
test('Pages build explicitly disables local API while local build preserves it',async()=>{
 const {deployment}=await import('../public/deployment.mjs');assert.equal(deployment.localServer,true);
 const build=await readFile(new URL('../scripts/build-pages.mjs',import.meta.url),'utf8');assert.ok(build.includes('localServer: false'));
 const app=await readFile(new URL('../public/app.mjs',import.meta.url),'utf8');assert.ok(app.includes("if(!deployment.localServer)preferences.mode='offline'"));
});
