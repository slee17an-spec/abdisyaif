import { getApiKeyRecord } from "../security/apikeys.js";

export function requireApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"]?.trim();

  // Missing API key
  if (!apiKey) {
    return res.status(401).json({ error: "API key required" });
  }

  const record = getApiKeyRecord(apiKey);

  // Invalid or inactive API key
  if (!record || record.active !== true) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Attach metadata for next middleware
  req.apiKey = apiKey;
  req.apiKeyRecord = record;

  next();
}

