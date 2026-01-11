import Redis from "ioredis";

let redis = null;

export function initRedis() {
  if (!process.env.REDIS_URL) return null;

  redis = new Redis(process.env.REDIS_URL);
  console.log("🧠 Redis cache aktif");
  return redis;
}

export function getRedis() {
  return redis;
}
