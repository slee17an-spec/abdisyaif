import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import logger from "./logger.js";
import errorHandler from "./errorHandler.js";


dotenv.config();
const app = express();

app.get("/api/news", async (req, res) => {
  const { topic } = req.query;
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${process.env.NEWS_API_KEY}`;
  const response = await fetch(url);
  res.json(await response.json());
});

app.listen(process.env.PORT, () => console.log("News server running"));
