import { dirname, extname, join, relative } from "path";
import { ensureDir, exists, WalkEntry } from "fs";
import { render } from "preact-render-to-string";
import { bgCyan } from "fmt";
import { config } from "./load_config.ts";
import * as log from "log";

export async function renderModule(modPath: string): Promise<string> {
  // @ts-ignore
  const mod = await import(modPath);

  if (mod.default != undefined) {
    // <Layout title="Site title">{}</Layout>;
    return render(mod.default());
  }

  // TODO: throw error, Can't render module.
  return "";
}

export async function renderAll(
  outdir: string,
  glob_array: string[],
  target_jsx: WalkEntry[],
) {
  if (target_jsx.length == 0) {
    throw "Target is not found.";
  }

  await Promise.all(
    target_jsx.map(async (jsx_entry: WalkEntry) => {
      const html = await renderModule(jsx_entry.path);

      // convert extname `.jsx` or `.tsx` to `.html`
      const save_filename = (entry: WalkEntry) => {
        // console.log("to save ", relative(Deno.cwd(), entry.path));

        let rel: string = relative(Deno.cwd(), entry.path);

        glob_array.forEach((glob) => {
          rel = rel.replace(extname(glob), ".html");
        });

        return rel;
      };

      const filename = save_filename(jsx_entry);
      const parent = join(outdir, dirname(filename));

      log.debug(`filenale: ${filename}`);
      log.debug(`parent: ${parent}`);

      log.debug(
        join(relative(Deno.cwd(), jsx_entry.path), jsx_entry.name),
      );

      if (!(await exists(parent))) {
        await ensureDir(parent);
      }

      await Deno.writeTextFile(
        join(outdir, filename),
        config.embed_to_html(html),
      );

      log.info(`Save to ${join(outdir, filename)}`);
    }),
  );
}
