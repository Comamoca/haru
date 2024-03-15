import { renderAll } from "./render.ts";
import { collect } from "../kit/collect.ts";
import { config } from "./load_config.ts";
import { green } from "fmt";
import * as log from "log";
import { buildTailwind } from "../contrib/tailwind.ts";
import { exists } from "https://deno.land/std@0.218.2/fs/mod.ts";
import { join } from "path";
import { ensureDir } from "fs";
import { is } from "unknownutil";
import { Command } from "cliffy";

const initLog = (level = "INFO") => {
  log.setup({
    handlers: {
      stringFmt: new log.ConsoleHandler(level, {
        formatter: (record) =>
          `${green(`[ ${record.levelName} ]`)} ${record.msg}`,
      }),
    },

    loggers: {
      default: {
        level: level,
        handlers: ["stringFmt"],
      },
    },
  });
};

async function runRender(isDev: boolean) {
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

  await renderAll(outdir, glob_array, target_jsx, isDev);

  log.info("Rendering is all done.🎉");
}

await new Command()
  .name("haru")
  .version("0.0.1")
  .description("Simple and flexible SSG.")
  .globalOption("-d, --debug", "Enable debug output.")
  .action(async (options, ...args) => {
    // Rendering for release.
    initLog(options.debug ? "DEBUG" : "INFO");

    // Render release mode.
    await runRender(false);
  })
  // Initialize command
  .command("init", "Project initialize command.")
  .arguments("<arg>")
  .action((options, ...args) => {
    console.log(args);
    console.log("init command called.");
  })
  // Initialize command. But create new directory.
  .command("new", "Create new Project command.")
  .option("-n, --name", "")
  .arguments("<arg:string>")
  .action((options, ...args) => {
    console.log(args[0]);
    console.log("init command called.");
  })
  // For develop.
  .command("dev", "Preview and launch live server.")
  .action(async (options, ...args) => {
    initLog();

    log.info("Render develop mode.");

    // Render develop mode.
    await runRender(true);
  })
  .parse(Deno.args);
