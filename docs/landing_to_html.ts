import markdownit from "npm:markdown-it";
import markdownitAnchor from "npm:markdown-it-anchor";
import Shiki from "npm:@shikijs/markdown-it";
import { render } from "https://deno.land/x/gfm@0.6.0/mod.ts";

const markdown = await Deno.readTextFile("landing.md");

const md = markdownit()
  .use(markdownitAnchor)
  .use(
    await Shiki({
      theme: "one-dark-pro",
    }),
  );

export const readme_html = md.render(markdown);
