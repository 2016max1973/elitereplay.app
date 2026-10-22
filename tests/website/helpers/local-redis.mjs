import {spawn,execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import {once} from 'node:events';
import {createServer} from 'node:http';
import {setTimeout as delay} from 'node:timers/promises';

const run=promisify(execFile);

export async function localRedis(binary) {
  const dir=await mkdtemp(join(tmpdir(),'er-enquiry-'));
  const socket=join(dir,'redis.sock');
  const child=spawn(binary,['--port','0','--unixsocket',socket,'--unixsocketperm','700',
    '--save','','--appendonly','no','--maxmemory-policy','noeviction','--dir',dir],{stdio:'ignore'});
  const closed=once(child,'exit');
  const command=async args=>{
    const {stdout}=await run(join(dirname(binary),'redis-cli'),['-s',socket,'--json',...args.map(String)],{timeout:3000,maxBuffer:128*1024});
    return JSON.parse(stdout);
  };
  try {
    for(let n=0;;n++) {
      try {if(await command(['PING'])==='PONG')break;}catch(error){if(n===40)throw error;}
      await delay(50);
    }
  }catch(error){child.kill('SIGTERM');await closed;await rm(dir,{recursive:true,force:true});throw error;}
  const commands=[];
  const bridge=createServer(async(req,res)=>{
    try {
      if(req.method!=='POST' || req.headers.authorization!=='Bearer local-test-only') {
        res.writeHead(401);res.end('{}');return;
      }
      const chunks=[];for await(const chunk of req)chunks.push(chunk);
      const args=JSON.parse(Buffer.concat(chunks).toString());
      commands.push(args);
      const result=await command(args);
      res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({result}));
    }catch{res.writeHead(503,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Local test store unavailable'}));}
  });
  bridge.listen(0,'127.0.0.1');await once(bridge,'listening');
  const env={UPSTASH_REDIS_REST_URL:`http://127.0.0.1:${bridge.address().port}`,
    UPSTASH_REDIS_REST_TOKEN:'local-test-only',ELITEREPLAY_ENQUIRY_HASH_SECRET:'local-test-secret-not-used-anywhere-else'};
  return {command,commands,env,
    async stop(){
      await new Promise(resolve=>bridge.close(resolve));
      child.kill('SIGTERM');await closed;
      await rm(dir,{recursive:true,force:true});
    }};
}
