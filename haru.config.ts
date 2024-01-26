import { Config } from "./utils/load_config.ts";

export default {
  output: "_dist",
  input: ".",
  embed_to_html: (html) => {
    return `<!DOCTYPE html>
      <head>
      </head>
      <html lang="ja">
      <body>
        <div class="flex justify-center">
	${html}
        </div>
      </body>
    </html>`;
  },
} as Config;
