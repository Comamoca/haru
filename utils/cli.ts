import { renderAll } from "./render.ts";
import { collect } from "./collect.ts";
import { config } from "./load_config.ts";
import { green } from "fmt";
import * as log from "log";
import { buildTailwind } from "../contrib/tailwind.ts";
import { exists } from "https://deno.land/std@0.218.2/fs/mod.ts";
import { join } from "path";
import { is } from "unknownutil";

log.setup({
  handlers: {
    stringFmt: new log.ConsoleHandler("DEBUG", {
      formatter: (record) =>
        `${green(`[ ${record.levelName} ]`)} ${record.msg}`,
    }),
  },

  loggers: {
    default: {
      level: "DEBUG",
      // level: "INFO",
      handlers: ["stringFmt"],
    },
  },
});

const outdir = config.output;
const glob_array = ["**/index.tsx", "**/index.jsx"];
const target_jsx = await collect(glob_array);

if (!is.Nullish(config.tailwind)) {
  try {
    await buildTailwind();
  } catch (e) {
    log.critical(`Occurrence error in Tailwind CSS. ${e}`);
  }
}

await renderAll(outdir, glob_array, target_jsx);

log.info("Rendering is all done.🎉");
