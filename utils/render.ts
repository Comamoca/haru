import { dirname, extname, join, relative } from "path";
import { ensureDir, exists, WalkEntry } from "fs";
import { render } from "preact-render-to-string";
import { bgCyan } from "fmt";
import { config } from "./load_config.ts";

export async function renderAll(
  outdir: string,
  glob_array: string[],
  target_jsx: WalkEntry[],
) {
  if (target_jsx.length == 0) {
    console.log(bgCyan("INFO"));
    console.log("Rendering target is not found...💤");
  }

  await Promise.all(
    target_jsx.map(async (jsx_entry: WalkEntry) => {
      // @ts-ignore
      const mod = await import(jsx_entry.path);

      if (mod.default != undefined) {
        // console.log(jsx_entry);

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

        console.log(`filenale: ${filename}`);
        console.log(`parent: ${parent}`);

        if (!(await exists(parent))) {
          await ensureDir(parent);
        }

        console.log(
          join(relative(Deno.cwd(), jsx_entry.path), jsx_entry.name),
          // render(<Layout title="Site title">{mod.default}</Layout>),
        );

        // -------------------------------------------------

        // <Layout title="Site title">{}</Layout>;
        const html = render(mod.default);

        await Deno.writeTextFile(
          join(outdir, filename),
          config.embed_to_html(html),
        );

        console.log(`Save to ${join(outdir, filename)}`);
      }
    }),
  );
}
