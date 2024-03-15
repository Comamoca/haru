import markdownit from "npm:markdown-it";
import markdownitAnchor from "npm:markdown-it-anchor";
import Shiki from "npm:@shikijs/markdown-it";
import { DOMParser } from "npm:linkedom";
import { config } from "../../utils/load_config.ts";
import { ensureDir } from "fs";
import { dirname, join, parse, relative } from "path";
import { render } from "https://deno.land/x/gfm@0.6.0/mod.ts";
import { collect } from "../../kit/collect.ts";
import { WalkEntry } from "fs/_util.ts";

const embed_to_html = (html) => {
  return `<!DOCTYPE html>
      <html lang="ja">
      <head>
      <link rel="stylesheet" href="/css/tailwind.css">
      <link rel="stylesheet" href="/pagefind/pagefind-ui.css" />
      </head>
      <body>
        <article class="prose mx-auto mt-5">
          ${html}
        </article>
      </body>
      <script src="/pagefind/pagefind-ui.js"></script>
      <script>
          window.addEventListener('DOMContentLoaded', (event) => {
              new PagefindUI({ element: "#search", showSubResults: true });
          });
      </script>
      </html>`;
};

const markdownIt = markdownit()
  .use(markdownitAnchor)
  .use(
    await Shiki({
      theme: "one-dark-pro",
    }),
  );

const md_paths = await collect([`${join(Deno.cwd(), "pages")}/**.md`]);

const md_texts = md_paths.map((entry: WalkEntry) => {
  return { path: entry.path, text: Deno.readTextFileSync(entry.path) };
});

const html_texts = md_texts.forEach((md_text) => {
  const html = embed_to_html(markdownIt.render(md_text.text));

  const parsed_path = parse(md_text.path);

  const save_path = join(
    // TODO: use config.output
    join(config.output, "pages"),
    parsed_path.base.replace(".md", ".html"),
  );

  console.log(
    `Rendering ${relative(Deno.cwd(), md_text.path)} ==> ${
      relative(Deno.cwd(), save_path)
    }`,
  );

  ensureDir(dirname(save_path));

  Deno.writeTextFileSync(save_path, html);
});

export default function () {
  return (
    <>
      <ul>
        {
          /*
        {md_paths.map((entry) => {
          return <li>{entry.path}</li>;
        })}
	*/
        }
      </ul>
    </>
  );
}
