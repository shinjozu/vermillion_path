export function allowedOrigins(port,publicURL=''){
 const origins=new Set([`http://127.0.0.1:${port}`,`http://localhost:${port}`]);
 if(publicURL){
  const u=new URL(publicURL);
  if(u.protocol!=='https:'||u.username||u.password||u.pathname!=='/'||u.search||u.hash||u.port)throw Error('PUBLIC_GAME_URL must be an HTTPS origin without a path, credentials or custom port.');
  origins.add(u.origin);
 }
 return {origins,hosts:new Set([...origins].map(o=>new URL(o).host))};
}
