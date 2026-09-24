import test from 'node:test';
import assert from 'node:assert/strict';
import {createCharacter,act,encode,decode} from '../public/engine.mjs';
import {artTechnique} from '../public/personal-art.mjs';
const novice=()=>createCharacter({build:{martial:'none'},seed:'own-art'});
test('blank-canvas traveler creates, practices and saves an independent art',()=>{
 const before=novice();let s=act(before,'invent:mind',{text:'Rain Mirror'});
 assert.equal(s.personalArt.name,'Rain Mirror');assert.equal(s.insight,0);assert.equal(s.qi,before.qi-4);assert.equal(s.time,3);
 s=act(s,'train:personal');assert.equal(s.techniques.personal,1);
 assert.deepEqual(decode(encode(s)).personalArt,s.personalArt);
 assert.equal(artTechnique(s).counter,'heavy');assert.equal(before.personalArt,undefined);
 assert.throws(()=>act(s,'invent:body'));
});
test('creation and evolution failures are atomic',()=>{
 let s=novice();s.qi=0;const original=structuredClone(s);assert.throws(()=>act(s,'invent:body'));assert.deepEqual(s,original);
 s=act(novice(),'invent:body');const created=structuredClone(s);assert.throws(()=>act(s,'evolve:force'),/mastery/);assert.deepEqual(s,created);
 assert.throws(()=>act(novice(),'invent:body',{text:'<bad>'}));
});
test('combat use, evolution tradeoffs and tampered saves are validated',()=>{
 let s=act(novice(),'invent:spirit');s.combat={hp:70,maxHp:70,intent:'quick',turn:0,style:'enforcer',sandbox:true};s.hp=s.maxHp;s.qi=s.maxQi;
 s=act(s,'tech:personal');assert.equal(s.personalArt.uses,1);assert.equal(s.techniques.personal,1);
 s.combat=null;s.personalArt.uses=3;s.techniques.personal=3;s.insight=8;s.qi=s.maxQi;s.cultivation=1;s.maxHp+=2;s.maxQi+=2;
 s=act(s,'evolve:force');assert.equal(artTechnique(s).power,6);assert.equal(artTechnique(s).cost,4);assert.equal(s.personalArt.uses,0);assert.equal(s.techniques.personal,0);
 assert.equal(decode(encode(s)).personalArt.evolutions[0],'force');
 s.personalArt.foundation='invented';assert.throws(()=>decode(encode(s)));
});
