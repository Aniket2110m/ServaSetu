import dotenv from "dotenv";
import http from "http";
import https from "https";

dotenv.config();

const keepAliveUrl = process.env.RENDER_KEEP_ALIVE_URL || "";
const intervalMinutes = Number(process.env.RENDER_KEEP_ALIVE_INTERVAL_MINUTES || "10");
const timeoutMs = 15000;

if (!keepAliveUrl) {
  console.error("[keepalive] Missing RENDER_KEEP_ALIVE_URL in environment.");
  process.exit(1);
}

if (!Number.isFinite(intervalMinutes) || intervalMinutes <= 0) {
  console.error("[keepalive] RENDER_KEEP_ALIVE_INTERVAL_MINUTES must be a positive number.");
  process.exit(1);
}

const ping = (): Promise<void> => {
  return new Promise((resolve) => {
    const url = new URL(keepAliveUrl);
    const client = url.protocol === "https:" ? https : http;

    const req = client.request(
      {
        method: "GET",
        hostname: url.hostname,
        port: url.port || undefined,
        path: `${url.pathname}${url.search}`,
        timeout: timeoutMs,
        headers: {
          "User-Agent": "servasetu-keepalive/1.0"
        }
      },
      (res) => {
        const statusCode = res.statusCode ?? 0;
        res.resume();

        const statusLabel = statusCode >= 200 && statusCode < 400 ? "OK" : "WARN";
        console.log(
          `[keepalive] ${new Date().toISOString()} ${statusLabel} ${statusCode} ${keepAliveUrl}`
        );
        resolve();
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error("Request timeout"));
    });

    req.on("error", (error: Error) => {
      console.error(
        `[keepalive] ${new Date().toISOString()} ERROR ${keepAliveUrl} -> ${error.message}`
      );
      resolve();
    });

    req.end();
  });
};

console.log(`[keepalive] Started. URL=${keepAliveUrl} interval=${intervalMinutes} minute(s)`);

void ping();
const intervalMs = intervalMinutes * 60 * 1000;
const timer = setInterval(() => {
  void ping();
}, intervalMs);

const shutdown = (): void => {
  clearInterval(timer);
  console.log("[keepalive] Stopped.");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
