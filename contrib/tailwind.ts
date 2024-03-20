import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
import tailwind from "npm:tailwindcss@3.3.5";
import { ensureDir } from "../deps.ts";
import cssnano from "npm:cssnano";
import { join } from "../deps.ts";
import { config } from "../utils/load_config.ts";

export async function buildTailwind() {
  const css = `
@tailwind base;
@tailwind components;
@tailwind utilities;`;

  const postcss_config = {
    plugins: [
      tailwind(config.tailwind),
      cssnano,
    ],
  };

  const { css: output_css } = await postcss(postcss_config.plugins).process(
    css,
    {
      from: undefined,
    },
  );

  const distCSSDir = join(config.output, "css");

  await ensureDir(distCSSDir);

  const outpath = join(distCSSDir, "tailwind.css");

  await Deno.writeTextFile(outpath, output_css);
}
