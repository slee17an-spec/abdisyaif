import fs from "fs";
import path from "path";

const logDir = path.resolve("logs");
const logFile = path.join(logDir, "ai-usage.log");

// Pastikan folder logs ada
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export function logUsage(data) {
  const line = JSON.stringify({
    ...data,
    timestamp: new Date().toISOString()
  }) + "\n";

  fs.appendFile(logFile, line, err => {
    if (err) console.error("LOG ERROR:", err.message);
  });
}
