import { Config } from "../utils/load_config.ts";
import typography from "npm:@tailwindcss/typography";

export default {
  output: "_dist",
  input: ".",
  tailwind: {
    content: ["**/*.{html, tsx}"],
    theme: {
      extend: {},
    },
    daisyui: {
      themes: ["retro"],
    },
    plugins: [typography],
  },
  embed_to_html: (html) => {
    return `<!DOCTYPE html>
      <html lang="ja">

      <head>
      <link rel="stylesheet" href="css/tailwind.css">
      </head>
      <body>
	${html}
      </body>
    </html>`;
  },
} as Config;
