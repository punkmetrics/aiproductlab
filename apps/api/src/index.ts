import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { health } from "./routes/health.js";

const app = new Hono();

app.route("/health", health);

const port = Number(process.env.PORT) || 8787;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API em http://localhost:${info.port}`);
});
