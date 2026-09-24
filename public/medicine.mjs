import {currentRegion,regionNames} from './regions.mjs';
import {hashSeed} from './procedural.mjs';
const cases={
 fever:{name:'A shivering kiln worker',symptoms:'Chills follow the fever; the worker has been drinking from a flooded well.',method:'tonic',difficulty:11,fee:6},
 wound:{name:'A wounded road porter',symptoms:'The porter supports one forearm. Swelling hides the fracture beneath an old bandage.',method:'splint',difficulty:12,fee:7},
 exhaustion:{name:'An exhausted ferry runner',symptoms:'The runner is faint after missed meals and a night carrying messages.',method:'breath',difficulty:10,fee:5}
};
export const freshMedicine=()=>({trained:false,xp:0,completed:0,nextAt:0,patient:null,history:[]});
export const medicineRank=s=>Math.min(5,Math.floor(s.medicine.xp/3));
export const remedyPrice=s=>currentRegion(s)?.supplies<30?4:2;
export function medicineSummary(s){const m=s.medicine,p=m.patient;return !m.trained?'Learn field medicine at a district clinic after leaving the valley.':`Field medicine ${medicineRank(s)}/5 · experience ${m.xp}/15 · ${m.completed} cases closed. `+(p?`${cases[p.kind].name} in ${regionNames[p.region]}. ${p.stage==='complication'?'Treatment met a complication: arrange supervised recovery at any clinic.':p.examined?'Examined: '+cases[p.kind].symptoms:'Examine before choosing treatment.'}`:s.time<m.nextAt?`Next clinic shift at turn ${m.nextAt}.`:'A clinic shift is available.');}
function accessible(s){return s.chapter>1&&s.location==='clinic'&&!s.combat&&!s.ending;}
export function medicineOptions(s){if(!accessible(s))return [];const m=s.medicine,r=currentRegion(s);if(!m.trained)return [{id:'medicine:learn',label:'Learn field medicine',detail:'2 turns · 3 coins · unlock clinic shifts and field remedies'}];const a=[];
 if(r.supplies>=2&&s.inventory.herb<100)a.push({id:'medicine:buy',label:'Buy a field remedy',detail:`1 turn · ${remedyPrice(s)} coins · 1 herb · consumes 2 district supplies`});
 if(!m.patient){if(s.time>=m.nextAt)a.push({id:'medicine:accept',label:'Take a clinic shift',detail:'1 turn · meet a patient; diagnosis and treatment are separate'});return a;}
 const p=m.patient,c=cases[p.kind];a.push({id:'medicine:refer',label:'Arrange supervised recovery',detail:'2 turns · no fee earned · +1 medicine experience · patient safely handed over'});
 if(p.region!==s.regions.districts.indexOf(r)||p.stage==='complication')return a;
 if(!p.examined)a.push({id:'medicine:examine',label:'Examine the patient',detail:'1 turn · 1 qi · reveal symptoms and gain +3 care score'});
 if(!p.consulted)a.push({id:'medicine:consult',label:'Consult the senior healer',detail:'1 turn · 2 coins · +3 care score for this patient'});
 const score=Math.max(s.stats.mind,s.stats.spirit)+medicineRank(s)+(p.examined?3:0)+(p.consulted?3:0);
 for(const [id,label]of [['tonic','Prepare a warming tonic'],['splint','Clean and splint the injury'],['breath','Restore breath with food and rest']])a.push({id:'medicine:'+id,label,detail:`2 turns · ${id==='breath'?'3 qi':'1 herb, 2 qi'} · care ${score} vs ${p.examined?c.difficulty:'unknown'} · ${p.examined?'choose the treatment matching the diagnosis':'diagnosis recommended'} · fee ${c.fee} on success`});return a;}
function closeCase(s,text){const m=s.medicine;m.xp=Math.min(15,m.xp+1);m.completed++;m.nextAt=s.time+8;m.history.push({time:s.time,text});m.history=m.history.slice(-12);s.facts.push(text);m.patient=null;}
export function resolveMedicine(s,id){if(!medicineOptions(s).some(o=>o.id==='medicine:'+id))throw Error('That clinic action is unavailable here.');const m=s.medicine,r=currentRegion(s);const spend=(k,n)=>{if(s[k]<n)throw Error(`This care needs ${n} ${k}.`);s[k]-=n;};
 if(id==='learn'){spend('coins',3);m.trained=true;return {time:2,text:'The clinic steward teaches pulse, cleanliness and restraint. “Call for help before pride makes a patient worse.” Field medicine unlocked.'};}
 if(id==='buy'){spend('coins',remedyPrice(s));s.inventory.herb++;r.supplies-=2;return {time:1,text:'You buy a sealed field remedy from the clinic stores. +1 herb; district supplies −2.'};}
 if(id==='accept'){const kind=r.supplies<30?'fever':r.safety<30?'wound':['fever','wound','exhaustion'][hashSeed(s.seed+':patient:'+m.completed)%3];m.patient={kind,region:s.regions.districts.indexOf(r),stage:'care',examined:false,consulted:false};return {time:1,text:cases[kind].name+' waits at the clinic. The steward sets aside a fee for completed care. Examine the patient before committing to treatment.'};}
 if(id==='examine'){spend('qi',1);m.patient.examined=true;return {time:1,text:cases[m.patient.kind].symptoms+' Examination gives +3 care score. A senior consultation can improve your chances further.'};}
 if(id==='consult'){spend('coins',2);m.patient.consulted=true;return {time:1,text:'The senior healer reviews the case with you. +3 care score for this patient; the fee is spent even if treatment later fails.'};}
 if(id==='refer'){const name=cases[m.patient.kind].name;closeCase(s,name+': handed over to supervised care. No treatment fee claimed.');return {time:2,text:'You hand over a careful case report. The patient remains under supervision. +1 medicine experience; no fee. A new shift will open after a recovery interval.'};}
 const p=m.patient,c=cases[p.kind];if(id!=='breath'&&!s.inventory.herb)throw Error('Treatment needs one herb.');spend('qi',id==='breath'?3:2);if(id!=='breath')s.inventory.herb--;
 const score=Math.max(s.stats.mind,s.stats.spirit)+medicineRank(s)+(p.examined?3:0)+(p.consulted?3:0);
 if(id!==c.method||score<c.difficulty){p.stage='complication';return {time:2,text:`Care score ${score} vs ${c.difficulty}. ${id!==c.method?'The treatment does not fit the condition.':'The case exceeds your current skill.'} The patient needs supervised recovery; committed resources are spent. No reward is granted. You can arrange the handover at any clinic.`};}
 s.coins+=c.fee;const home=s.regions.districts[p.region];home.prosperity=Math.min(100,home.prosperity+1);const text=`${c.name}: appropriate care succeeds (${score} vs ${c.difficulty}). +${c.fee} coins, +1 medicine experience; ${home.name} prosperity +1.`;closeCase(s,text);return {practice:'spirit',time:2,text};
}
export function validateMedicine(s){const m=s.medicine;if(!m||typeof m.trained!=='boolean'||!Number.isInteger(m.xp)||m.xp<0||m.xp>15||!Number.isInteger(m.completed)||m.completed<0||m.completed>1000000000||!Number.isInteger(m.nextAt)||m.nextAt<0||m.nextAt>1000000008||!Array.isArray(m.history)||m.history.length>12||m.history.some(h=>!Number.isInteger(h.time)||typeof h.text!=='string'||h.text.length>1000))throw Error('Invalid medicine history.');const p=m.patient;if(p&&(!m.trained||!Object.hasOwn(cases,p.kind)||!Number.isInteger(p.region)||p.region<0||p.region>7||!['care','complication'].includes(p.stage)||typeof p.examined!=='boolean'||typeof p.consulted!=='boolean'))throw Error('Invalid patient.');}
