import { render } from "../utils/render.ts";
import { collect } from "../utils/collect.ts";

Deno.test("testing render", async () => {
  // render do process below.
  // * collect `index.{tsx, jsx}`
  // render to HTML
  // render result write to file

  console.log(Deno.cwd());

  const outdir = "out";
  const glob_array = ["**/index.tsx", "**/index.jsx"];
  const target_jsx = await collect(glob_array);

  await render(outdir, glob_array, target_jsx);
});
