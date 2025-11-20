const express = require("express");
const client = require("prom-client");

const app = express();
const register = new client.Registry();

// Tạo một metric counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route"],
});

// Đăng ký metric
register.registerMetric(httpRequestCounter);
register.setDefaultLabels({ app: "demo-app" });
client.collectDefaultMetrics({ register });

// Route chính
app.get("/", (req, res) => {
  httpRequestCounter.inc({ method: "GET", route: "/" });
  res.send("Hello from Demo App!");
});

// Expose metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.send(await register.metrics());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Demo App is running on port ${PORT}`);
});
