import test from 'node:test';
import assert from 'node:assert/strict';
import {allowedOrigins} from '../server-origin.mjs';
test('remote origins are opt-in and exact while localhost remains allowed',()=>{
 const local=allowedOrigins(4317);assert.equal(local.hosts.size,2);assert.equal(local.hosts.has('game.example.com'),false);
 const remote=allowedOrigins(4317,'https://game.example.com');
 assert.ok(remote.hosts.has('game.example.com'));assert.ok(remote.origins.has('https://game.example.com'));
 assert.equal(remote.origins.has('https://game.example.com.evil.test'),false);
 assert.equal(remote.origins.has('http://game.example.com'),false);
 for(const bad of ['http://game.example.com','https://user:pass@game.example.com','https://game.example.com/path','https://game.example.com?x=1','https://game.example.com:8443'])assert.throws(()=>allowedOrigins(4317,bad));
});
