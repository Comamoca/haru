import postcss from "postcss";
import tailwind from "tailwind";
import { ensureDir } from "fs";
import cssnano from "npm:cssnano";
import { join } from "path";
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
