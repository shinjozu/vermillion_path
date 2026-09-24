export const attributes=['body','mind','spirit','fate'];
export const freshGrowth=()=>Object.fromEntries(attributes.map(k=>[k,{level:0,xp:0}]));
export const threshold=level=>8+level*4;
export function practice(s,key,amount=1){
 const g=s.growth[key];if(g.level>=6)return '';
 g.xp+=amount;if(g.xp<threshold(g.level))return '';
 g.xp-=threshold(g.level);g.level++;if(g.level===6)g.xp=0;s.stats[key]++;
 if(key==='body')s.maxHp+=2;if(key==='spirit')s.maxQi+=2;
 return `${key.toUpperCase()} grows to ${s.stats[key]} through experience.${key==='body'?' Maximum health +2.':key==='spirit'?' Maximum qi +2.':''}`;
}
export function validateGrowth(s){for(const k of attributes){const g=s.growth?.[k];if(!g||!Number.isInteger(g.level)||g.level<0||g.level>6||!Number.isInteger(g.xp)||g.xp<0||g.xp>=(g.level===6?1:threshold(g.level)))throw Error('Invalid attribute progress.');}if(!Number.isInteger(s.wounds)||s.wounds<0||s.wounds>3)throw Error('Invalid wounds.');}
export const threatTier=s=>Math.min(4,Math.floor((Object.values(s.growth).reduce((n,g)=>n+g.level,0)+s.cultivation)/5));
export function scaleEncounter(s){const c=s.combat;if(!c)return;const tier=threatTier(s);c.threat=tier;c.lethal=!!c.sandbox&&tier>=2;c.hp+=tier*4;c.maxHp+=tier*4;}
