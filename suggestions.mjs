import {factions} from './world.mjs';
import {hashSeed} from './procedural.mjs';
export function offlineSuggestions(s,available){
 available=available.filter(o=>{
  if(/^(invent|evolve):/.test(o.id))return false;
  if(o.id==='explore')return !s.flags['search:'+s.location];
  if(o.id==='heal')return s.inventory.herb>0&&s.hp<s.maxHp;
  if(o.id==='rest')return s.coins>=Number(o.detail.match(/(\d+) coins/)?.[1]||2)&&(s.hp<s.maxHp||s.qi<s.maxQi);
  if(o.id==='cultivate')return s.qi>=6&&s.insight>=(s.build.qigong==='none'&&s.cultivation===0?1:2)&&Object.values(s.techniques).some(v=>v>=1)&&s.cultivation<Math.min(8,(s.chapter||1)+1);
  return true;
 });
 const npc=s.chapter===1&&!s.combat?factions.find(f=>f.place===s.location&&f.id===s.flags.speaker)||factions.find(f=>f.place===s.location):null;
 const lines=['What do you know about the convoy?','What are you trying to protect here?','I want to help. What matters most to you?','Who benefits from keeping us silent?','Tell me what you saw yourself.','I will listen, but I will not promise blindly.'];
 const immediate=available.filter(o=>/^(meeting|sect|sectarc|medicine|event):/.test(o.id));const relevant=immediate.length>=3?immediate:available;const pool=npc?lines.map(text=>({text,action:'talk:'+npc.id})):relevant.filter(o=>!o.id.startsWith('improvise:')&&!o.id.startsWith('end:')).map(o=>({text:o.label,action:o.id}));
 return pool.map((o,i)=>({...o,rank:hashSeed(s.seed+':choice:'+s.revision+':'+i)})).sort((a,b)=>a.rank-b.rank).slice(0,3).map(({rank,...o})=>o);
}
export function validateSuggestions(data,legal){if(!Array.isArray(data)||data.length!==3)throw Error('AI must return three choices.');const seen=new Set();return data.map(o=>{if(!o||typeof o.text!=='string'||!o.text.trim()||o.text.length>180||!legal.includes(o.action)||seen.has(o.text.trim()))throw Error('AI returned an invalid choice.');seen.add(o.text.trim());return {text:o.text.trim(),action:o.action};});}
