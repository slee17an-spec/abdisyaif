import express from "express";
import { env } from "../config/env.js";

const r = express.Router();

r.get("/health", (req, res) => {
  res.json({
    status: "ok",
    services: env.enable
  });
});

export default r;
