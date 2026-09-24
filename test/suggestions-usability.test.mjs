import test from 'node:test';
import assert from 'node:assert/strict';
import {createCharacter,options} from '../public/engine.mjs';
import {offlineSuggestions} from '../public/suggestions.mjs';
test('offline suggestions exclude exhausted searches, unusable healing and inaccessible cultivation',()=>{
 const s=createCharacter({seed:'choices'});s.chapter=2;s.flags['search:gate']=true;s.inventory.herb=0;s.coins=0;s.qi=0;
 for(let i=0;i<30;i++){
  s.revision=i;
  assert.ok(offlineSuggestions(s,options(s)).every(o=>!['explore','heal','rest','cultivate'].includes(o.action)));
 }
});
