import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import logger from "./logger.js";
import errorHandler from "./errorHandler.js";


dotenv.config();
const app = express();

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
  const response = await fetch(url);
  res.json(await response.json());
});

app.listen(process.env.PORT, () => console.log("Weather server running"));

