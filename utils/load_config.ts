import { join } from "path";
import { gray, italic } from "fmt";
import { is } from "unknownutil";
import * as log from "log";

const config_module = await (async function () {
  try {
    return await import(join(Deno.cwd(), "haru.config.ts"));
  } catch (e) {
    log.critical(
      log.critical(e),
    );
    Deno.exit(1);
  }
})();

if (is.Nullish(config_module)) {
  const style = (text: string): string => italic(gray(text));
  log.critical(
    `Can not load config file. Please check ${style("haru.config.ts")}.`,
  );
  Deno.exit(1);
}

const default_embed_to_html = (html: string): string => {
  return `<!DOCTYPE html>
      <html lang="ja">
      <body>
	${html}
      </body>
    </html>`;
};

const load_config: Config = config_module.default;

export const config: Config = {
  output: load_config.output,
  input: load_config.input,
  embed_to_html: load_config.embed_to_html
    ? load_config.embed_to_html
    : default_embed_to_html,
  tailwind: load_config.tailwind,
};

export interface Config {
  output: string;
  input: string;
  pretty: boolean;
  title: string;
  embed_to_html: (html: string) => string;
  tailwind: Record<string, unknown>;
}
