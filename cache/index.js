import { getMemory, setMemory } from "./memory.js";
import { getRedis } from "./redis.js";
import { generateCacheKey } from "./keygen.js";
import { TTL_MAP, DEFAULT_TTL } from "./ttl.js";

export async function getCache(target, params) {
  const key = generateCacheKey(target, params);
  const redis = getRedis();

  if (redis) {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
  }

  return getMemory(key);
}

export async function setCache(target, params, data) {
  const key = generateCacheKey(target, params);
  const ttl = TTL_MAP[target] || DEFAULT_TTL;
  const redis = getRedis();

  if (redis) {
    await redis.set(key, JSON.stringify(data), "EX", ttl);
  } else {
    setMemory(key, data, ttl);
  }
}
