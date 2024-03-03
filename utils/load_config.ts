import { join } from "path";
import { gray, italic } from "fmt";
import { is } from "unknownutil";
import * as log from "log";

const config_module = await (async function () {
  try {
    return await import(join(Deno.cwd(), "haru.config.ts"));
  } catch {
  }
})();

if (is.Nullish(config_module)) {
  const style = (text: string): string => italic(gray(text));
  log.critical(
    `Can not load config file. Please check ${style("haru.config.ts")}.`,
  );
  Deno.exit(1);
}

export const config: Config = config_module.default;

export interface Config {
  output: string;
  input: string;
  embed_to_html: (html: string) => string;
}
