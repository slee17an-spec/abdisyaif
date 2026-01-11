import express from "express";
import aiService from "../services/core/ai.service.js";
import { requireApiKey } from "../middleware/auth.js";
import { rateLimiter } from "../middleware/rateLimit.js";
import { quotaLimiter } from "../middleware/quota.js";

const r = express.Router();

r.post(
  "/",
  requireApiKey,
  rateLimiter,
  quotaLimiter,
  aiService
);

export default r;
