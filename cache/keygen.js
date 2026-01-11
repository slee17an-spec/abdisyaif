import crypto from "crypto";

export function generateCacheKey(target, params) {
  const raw = JSON.stringify({ target, params });
  return `proxy:${target}:${crypto
    .createHash("md5")
    .update(raw)
    .digest("hex")}`;
}
