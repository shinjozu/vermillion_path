import {cp,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const target=new URL('dist/',root);
await mkdir(target,{recursive:true});
await cp(new URL('public/',root),target,{recursive:true});
await writeFile(new URL('deployment.mjs',target),'export const deployment = Object.freeze({ localServer: false });\n');
await writeFile(new URL('.nojekyll',target),'');
console.log('Pages build ready: '+fileURLToPath(target));
