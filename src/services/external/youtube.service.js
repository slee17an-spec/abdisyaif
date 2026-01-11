import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import logger from "./logger.js";
import errorHandler from "./errorHandler.js";


dotenv.config();
const app = express();

app.get("/api/youtube", async (req, res) => {
  const { query } = req.query;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&maxResults=5`;
  const response = await fetch(url);
  res.json(await response.json());
});

app.listen(process.env.PORT, () => console.log("YouTube server running"));
