import {hashSeed} from './procedural.mjs';
export const regionNames=['Black Reed','Fallen Plum','Cinder Ford','White Heron','Broken Moon','Nine Wells','Quiet Thunder','Red Willow'];
const bound=n=>Math.max(0,Math.min(100,n));
export function createRegions(seed,time=0){return {tick:Math.floor(time/12),districts:regionNames.map((name,i)=>({name,supplies:35+hashSeed(seed+':supply:'+i)%30,safety:35+hashSeed(seed+':safety:'+i)%30,prosperity:40,policy:'relief',project:null,history:[],completed:0}))};}
export function currentRegion(s){return s.chapter>1?s.regions.districts[s.regionIndex??hashSeed(s.seed+':'+s.chapter)%8]:null;}
function record(r,time,text){r.history.push({time,text});r.history=r.history.slice(-12);}
export function regionalTick(s){const lines=[];const target=Math.floor(s.time/12);for(let tick=s.regions.tick+1;tick<=target;tick++)for(const r of s.regions.districts){
 const old=r.supplies;const harvest=hashSeed(s.seed+':'+r.name+':'+tick)%4!==0;
 r.supplies=bound(r.supplies+(harvest?6:-10)-(r.policy==='patrol'?3:0));
 r.safety=bound(r.safety+(r.policy==='patrol'?6:-2));
 r.prosperity=bound(r.prosperity+(r.supplies>=40&&r.safety>=40?3:-2));
 const text=(harvest?'A caravan arrives':'Floodwater spoils a shipment')+`; supplies ${old} → ${r.supplies}. ${r.policy==='patrol'?'Patrols consume stores and improve road safety.':'Relief stores grow, but patrol coverage thins.'}`;
 record(r,tick*12,text);if(r===currentRegion(s))lines.push(r.name+': '+text);
 }s.regions.tick=target;return lines;}
export function regionalOptions(s){const r=currentRegion(s);if(!r||s.combat||s.ending)return [];const p=r.project;
 if(!p)return [{id:'region:accept',label:'Hear the district petition',detail:'Market · open a relief or patrol project · 1 turn'}].filter(()=>s.location==='market');
 if(p.stage==='settled'&&s.location==='market')return [{id:'region:policy',label:r.policy==='relief'?'Shift funds to patrols':'Shift funds to relief',detail:'1 turn · 4 coins · change ongoing policy; no repeated project reward'}];
 if(p.stage==='choose')return s.location==='market'?[{id:'region:relief',label:'Support the relief kitchens',detail:'Commit 4 coins · deliver at the clinic · supplies and Bone Bell reputation'},{id:'region:patrol',label:'Fund the road patrol',detail:'Commit 4 coins · drill at the gate · safety and Ashen Hand reputation'}]:[];
 if(p.stage==='work'&&s.location===(p.path==='relief'?'clinic':'gate'))return [{id:'region:work',label:p.path==='relief'?'Deliver and prepare medicine':'Train the volunteer patrol',detail:'2 turns · 2 qi · then return to the market for payment'}];
 if(p.stage==='report'&&s.location==='market')return [{id:'region:report',label:'Report to the district steward',detail:'1 turn · earn 7 coins, 2 insight, reputation · settle local policy'}];
 return [];
}
export function regionalAction(s,id){const r=currentRegion(s);if(!regionalOptions(s).some(o=>o.id==='region:'+id))throw Error('That district action is unavailable here.');
 if(id==='policy'){if(s.coins<4)throw Error('Changing policy needs 4 coins.');s.coins-=4;r.policy=r.policy==='relief'?'patrol':'relief';const text='You redirect '+r.name+' funds to '+r.policy+'. The next regional interval will reflect the new policy.';record(r,s.time,text);return {time:1,text};}
 if(id==='accept'){r.project={stage:'choose',path:null};return {time:1,text:`${r.name}'s steward opens the stores ledger. Supplies ${r.supplies}, safety ${r.safety}. The kitchens and patrol both need support. You can fund one; the other must wait.`};}
 if(id==='relief'||id==='patrol'){if(s.coins<4)throw Error('The project needs 4 coins.');s.coins-=4;r.project={stage:'work',path:id};return {time:1,text:id==='relief'?'You buy medicine for the kitchens. Deliver it at the clinic; the patrol captain accepts that his recruits must wait.':'You buy equipment for volunteers. Drill them at the gate; the kitchens will have fewer stores.'};}
 if(id==='work'){if(s.qi<2)throw Error('This work needs 2 qi.');s.qi-=2;r.project.stage='report';return {time:2,text:'The work is finished. Return to the market steward to settle payment and the district policy.'};}
 const path=r.project.path;r.policy=path;r.supplies=bound(r.supplies+(path==='relief'?18:-5));r.safety=bound(r.safety+(path==='patrol'?18:-5));s.coins+=7;s.insight+=2;s.reputation[path==='relief'?'bone':'ash']++;r.completed++;r.project={stage:'settled',path};const text=`You settle ${r.name}'s ${path} petition. +7 coins, +2 insight. ${path==='relief'?'Medicine reaches the kitchens; fewer guards cover the road.':'Volunteers secure the roads; their meals draw on relief stores.'} The policy persists after you leave.`;record(r,s.time,text);return {time:1,text};
}
export function regionSummary(s){const r=currentRegion(s);return r?`${r.name}: supplies ${r.supplies}/100 · safety ${r.safety}/100 · prosperity ${r.prosperity}/100. Policy: ${r.policy}. ${!r.project?'A petition awaits at the market.':r.project.stage==='choose'?'Choose a policy at the market.':r.project.stage==='work'?'Bring the committed supplies to the '+(r.project.path==='relief'?'clinic.':'gate.'):r.project.stage==='report'?'Return to the market for payment.':'The petition is settled. Your policy continues to shape the district.'}`:'';}
export function validateRegions(s){const w=s.regions;if(!w||!Number.isInteger(w.tick)||w.tick<0||w.tick!==Math.floor(s.time/12)||!Array.isArray(w.districts)||w.districts.length!==8)throw Error('Invalid regional history.');for(let i=0;i<8;i++){const r=w.districts[i];if(r.name!==regionNames[i]||!['relief','patrol'].includes(r.policy)||!Number.isInteger(r.completed)||r.completed<0||r.completed>1||['supplies','safety','prosperity'].some(k=>!Number.isInteger(r[k])||r[k]<0||r[k]>100)||!Array.isArray(r.history)||r.history.length>12||r.history.some(h=>!Number.isInteger(h.time)||typeof h.text!=='string'||h.text.length>1000))throw Error('Invalid district.');if(r.project&&(!['choose','work','report','settled'].includes(r.project.stage)||(r.project.stage==='choose'?r.project.path!==null:!['relief','patrol'].includes(r.project.path))))throw Error('Invalid district project.');}}
