import postcss from "postcss";
import tailwind from "tailwind";
import { join } from "path";
import { config } from "./load_config.ts";

const css = `
@tailwind base;
@tailwind components;
@tailwind utilities;`;

const tailwind_config = await import(join(Deno.cwd(), "./tailwind.config.ts"));

const postcss_config = {
  plugins: [
    tailwind(tailwind_config.default),
  ],
};

const { css: output_css } = await postcss(postcss_config.plugins).process(css, {
  from: undefined,
});

const outpath = join(config.output, "tailwind.css");

await Deno.writeTextFile(outpath, output_css);
