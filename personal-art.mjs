import {techniques} from './world.mjs';
export const foundations={body:{name:'Iron Root',counter:'guard'},mind:{name:'Empty Mirror',counter:'heavy'},spirit:{name:'Quiet Flame',counter:'quick'}};
export function artTechnique(s){const a=s.personalArt;if(!a)return null;return {id:'personal',name:a.name,stat:a.foundation,counter:foundations[a.foundation].counter,cost:3+a.evolutions.filter(x=>x==='force').length,power:4+a.evolutions.reduce((n,x)=>n+(x==='force'?2:1),0),desc:'Your own martial art. '+(a.evolutions.length?a.evolutions.join(' → '):'An untested first form.')};}
export function allTechniques(s){return [...techniques,...(s.personalArt?[artTechnique(s)]:[])];}
export function personalActions(s){if(s.combat||s.ending)return [];return !s.personalArt?Object.entries(foundations).map(([id,f])=>({id:'invent:'+id,label:'Create an art: '+f.name,detail:`3 turns · 3 insight · 4 qi · uses ${id}, counters ${f.counter}`})):s.personalArt.evolutions.length<3?[{id:'evolve:force',label:'Evolve your art: force',detail:'3 turns · 4 insight · 6 qi · +2 power, +1 qi cost'},{id:'evolve:flow',label:'Evolve your art: flow',detail:'3 turns · 4 insight · 6 qi · +1 power, same qi cost'}]:[];}
export function developArt(s,verb,id,name){
 if(verb==='invent'){
  if(s.personalArt||!Object.hasOwn(foundations,id))throw Error('Choose an unused foundation.');
  if(s.insight<3||s.qi<4)throw Error('Creating an art needs 3 insight and 4 qi.');
  const title=String(name||'').trim()||foundations[id].name+' Art';
  if(title.length>48||/[<>\x00-\x1f]/.test(title))throw Error('Use a name of up to 48 characters without markup.');
  s.insight-=3;s.qi-=4;s.personalArt={name:title,foundation:id,evolutions:[],uses:0};s.techniques.personal=0;
  return `You create ${title}: a first form built on ${id}, countering ${foundations[id].counter} attacks. It needs practice, not a teacher.`;
 }
 const a=s.personalArt;
 if(!a||!['force','flow'].includes(id)||a.evolutions.length>=3)throw Error('This evolution is unavailable.');
 if(s.techniques.personal<3||a.uses<3||s.cultivation<a.evolutions.length+1)throw Error('Evolution needs mastery 3, three combat uses since the last evolution, and cultivation '+(a.evolutions.length+1)+'.');
 if(s.insight<4||s.qi<6)throw Error('Evolution needs 4 insight and 6 qi.');
 s.insight-=4;s.qi-=6;a.evolutions.push(id);a.uses=0;s.techniques.personal=0;
 return `${a.name} evolves through ${id}. Its new form must be practiced again. ${id==='force'?'+2 base power; +1 qi per use.':'+1 base power; qi cost unchanged.'}`;
}
export function validatePersonalArt(s){const a=s.personalArt;if(a==null){if(Object.hasOwn(s.techniques||{},'personal'))throw Error('Missing personal art.');return;}
 if(typeof a.name!=='string'||!a.name.trim()||a.name.length>48||/[<>\x00-\x1f]/.test(a.name)||!Object.hasOwn(foundations,a.foundation)||!Array.isArray(a.evolutions)||a.evolutions.length>3||a.evolutions.some(x=>!['force','flow'].includes(x))||!Number.isInteger(a.uses)||a.uses<0||a.uses>3||!Object.hasOwn(s.techniques||{},'personal'))throw Error('Invalid personal art.');
}
