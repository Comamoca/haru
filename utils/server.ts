import { Hono } from "https://deno.land/x/hono@v3.3.0/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.9.0/middleware.ts";
import { config } from "./load_config.ts";

const app = new Hono();

app.use("/*", serveStatic({ root: config.output }));

Deno.serve(app.fetch);
