import rateLimit from "express-rate-limit";
export const rateLimiter=rateLimit({
  windowMs:60000,
  keyGenerator:r=>r.apiKey||r.ip,
  max:r=>r.apiLimits?.rpm||30,
  standardHeaders:true, legacyHeaders:false
});
