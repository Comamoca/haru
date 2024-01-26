import { join } from "path";

const config_module = await import(join(Deno.cwd(), "haru.config.ts"));

export const config: Config = config_module.default;

export interface Config {
  output: string;
  input: string;
  embed_to_html: (html: string) => string;
}
