import { assertEquals } from "https://deno.land/std@0.218.2/assert/mod.ts";
import { renderAll, renderModule } from "../utils/render.ts";
import { collect } from "../kit/collect.ts";
import { join } from "../deps.ts";

Deno.test("testing convert jsx to html", async () => {
  const actual =
    `<div class="m-3"><h1 class="text-4xl text-red-600">Howdy!</h1><div class="btn btn-primary">Button</div></div>`;
  const expect = await renderModule(join(Deno.cwd(), "index.tsx"));

  assertEquals(actual, expect);
});

Deno.test("testing render", async () => {
  const outdir = "out";
  const glob_array = ["**/index.tsx", "**/index.jsx"];
  const target_jsx = await collect(glob_array);

  await renderAll(outdir, glob_array, target_jsx);
});
