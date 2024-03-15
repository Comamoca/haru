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
      <link rel="stylesheet" href="/css/tailwind.css">
      <link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
      </head>
      <body>
	${html}
      </body>
      <script src="/pagefind/pagefind-ui.js"></script>
      <script>
          window.addEventListener('DOMContentLoaded', (event) => {
              new PagefindUI({ element: "#search", showSubResults: true });
          });
      </script>
      </html>`;
  },
} as Config;
