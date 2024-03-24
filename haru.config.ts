import { Config } from "./utils/load_config.ts";

export default {
  output: "_dist",
  input: ".",
  embed_to_html: (html) => {
    return `<!DOCTYPE html>
      <html lang="ja">
      <head>
      </head>
      <body>
        <div class="flex justify-center">
	${html}
        </div>
      </body>
    </html>`;
  },
} as Config;
