import OpenAI from "openai";
import { logUsage } from "../../utils/usageLogger.js";
import { estimateTokens } from "../../utils/tokenEstimator.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const PRICE_PER_1K = Number(process.env.OPENAI_PRICE_PER_1K_TOKENS || 0.0003);

export default async function aiService(req, res) {
  try {
    const { prompt } = req.body;
    const user = req.headers["x-api-key"];
	
    if (!prompt || typeof prompt !== "string" || prompt.length > 4000) {
  return res.status(400).json({ error: "prompt tidak valid" });
}

    const response = await client.responses.create({
      model: "gpt-5.2-pro",
      input: prompt
    });

    const output = response.output_text || "";

    // 🔢 Estimasi token
    const promptTokens = estimateTokens(prompt);
    const outputTokens = estimateTokens(output);
    const totalTokens = promptTokens + outputTokens;

    // 💰 Estimasi biaya
    const estimatedCost =
      (totalTokens / 1000) * PRICE_PER_1K;

    // 🧾 Log penggunaan
    logUsage({
      user,
      model: "gpt-5.2-pro",
      promptTokens,
      outputTokens,
      totalTokens,
      estimatedCostUSD: Number(estimatedCost.toFixed(6))
    });

    res.json({
      output,
      usage: {
        totalTokens,
        estimatedCostUSD: Number(estimatedCost.toFixed(6))
      }
    });

  } catch (err) {
    console.error("OPENAI ERROR:", err.message);
    res.status(500).json({ error: "AI service unavailable" });
  }
}
