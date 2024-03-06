import { $ } from "https://deno.land/x/dax@0.39.2/mod.ts";
import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts";

const watcher = Deno.watchFs(".");

for await (const ev of watcher) {
  console.log(ev.paths[0]);
  console.log(ev.paths[0].indexOf("_dist"));

  if (ev.paths[0].indexOf("_dist") == -1) {
    const dt = datetime();

    console.log(`Rerender at ${dt.format("HH:mm:ss")}`);
    await $`deno run -A ../utils/cli.ts`;
  }
}
