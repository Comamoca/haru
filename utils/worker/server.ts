import { Hono } from "https://deno.land/x/hono@v4.0.10/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v4.0.10/middleware.ts";
import { config } from "../load_config.ts";

const app = new Hono();

app.use("*", serveStatic({ root: config.output }));

Deno.serve({ port: 8080 }, app.fetch);
