export const styles={
 enforcer:{name:'Warrant Fist',pattern:['heavy','quick','guard'],damage:{heavy:9,quick:6,guard:3},block:4,read:'A deliberate heavy blow, a quick cut, then a guarded pause.'},
 duelist:{name:'Reed Sword',pattern:['quick','quick','heavy','guard'],damage:{heavy:10,quick:5,guard:2},block:3,read:'Two fast cuts precede a committed thrust. Counter quick attacks or guard until the recovery.'},
 warden:{name:'Iron Gate',pattern:['guard','heavy','guard','quick'],damage:{heavy:11,quick:5,guard:3},block:7,read:'A braced guard absorbs basic strikes. Guard-breaking techniques can punish the stance.'},
 disciple:{name:'Broken Furnace',pattern:['heavy','heavy','guard'],damage:{heavy:10,quick:5,guard:1},block:2,read:'Two forceful blows exhaust the disciple before a weak recovery guard.'},
 spear:{name:'Long Rain',pattern:['quick','guard','heavy','quick'],damage:{heavy:9,quick:7,guard:2},block:4,read:'A probing thrust, guarded footwork, then a sweeping attack. Quick counters blunt the reach.'}
};
export function combatStyle(c){const base=styles[c?.style]||styles.enforcer;return {...base,damage:Object.fromEntries(Object.entries(base.damage).map(([k,v])=>[k,v+(c?.threat||0)]))};}
export function prepareCombat(c,style){c.style=style;c.intent=combatStyle(c).pattern[0];return c;}
