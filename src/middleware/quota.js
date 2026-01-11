const store=new Map(); const today=()=>new Date().toISOString().slice(0,10);
export function quotaLimiter(req,res,next){
  const lim=req.apiLimits?.dailyQuota||600;
  const k=`${req.apiKey}:${today()}`; const u=store.get(k)||0;
  if(u>=lim) return res.status(429).json({error:"Quota harian habis"});
  store.set(k,u+1); next();
}
