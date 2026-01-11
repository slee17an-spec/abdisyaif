import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import aiRoutes from "../routes/ai.routes.js";
import healthRoutes from "../routes/health.routes.js";

const app = express();

// wajib jika di belakang Nginx / proxy
app.set("trust proxy", 1);

app.disable("x-powered-by");

// parsing
app.use(express.json({ limit: "10kb" }));

// security headers
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// rate limit global
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: Number(process.env.MAX_REQUESTS_PER_MINUTE) || 60,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS
if (process.env.ENABLE_CORS === "true") {
  app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-api-key"]
  }));
}

// routes
app.use("/api/ai", aiRoutes);
app.use("/api", healthRoutes);

// global error handler (PALING BAWAH)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
