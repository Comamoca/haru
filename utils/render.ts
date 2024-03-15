import { dirname, extname, join, relative, resolve } from "path";
import { ensureDir, exists, WalkEntry } from "fs";
import { DOMParser } from "npm:linkedom";
import { render } from "preact-render-to-string";
import { bgCyan } from "fmt";
import { config } from "./load_config.ts";
import beautify from "npm:js-beautify";
import { is } from "unknownutil";
import * as log from "log";

export async function renderModule(modPath: string): Promise<string> {
  // @ts-ignore
  const mod = await import(modPath);

  if (mod.default != undefined) {
    // <Layout title="Site title">{}</Layout>;
    return render(mod.default());
  }

  log.critical(
    `${relative(Deno.cwd(), modPath)} Does not export default function.`,
  );
  Deno.exit(1);

  return "";
}

export async function renderAll(
  outdir: string,
  glob_array: string[],
  target_jsx: WalkEntry[],
  isDev = false,
) {
  if (target_jsx.length == 0) {
    log.error("Rendering target is not found...");
    Deno.exit(0);
  }

  await Promise.all(
    target_jsx.map(async (jsx_entry: WalkEntry) => {
      let html = config.embed_to_html(await renderModule(jsx_entry.path));

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

      log.debug(`filename: ${filename}`);
      log.debug(`parent: ${parent}`);

      if (!(await exists(parent))) {
        await ensureDir(parent);
      }

      const writeHTML = async (path: strng, html: string) => {
        await Deno.writeTextFile(
          path,
          html,
        );
      };

      const path = join(outdir, filename);

      // Reload preview.
      // if () {
      // }

      // write link tag for tailwind css.
      if (!is.Nullish(config.tailwind)) {
        html = addCSSLinkTag(html, path);
      }

      // For develop build.
      if (isDev) {
        html = addLiveReloadScript(html);
      }

      // HTML pretty
      if (is.Nullish(config.pretty) || config.pretty) {
        html = prettyHTML(html);
      }

      await writeHTML(path, html);

      log.info(`Save to ${join(outdir, filename)}`);
    }),
  );
}

const addLiveReloadScript = (html: string) => {
  const document = new DOMParser().parseFromString(
    html,
    "text/html",
  );

  const scriptPath = new URL(join(dirname(import.meta.url), "reload.js"));
  const reloadScript = Deno.readTextFileSync(scriptPath);

  const script = document.createElement("script");

  script.innerHTML = reloadScript;

  document.body.insertAdjacentHTML("afterend", script.toString());

  return document.toString();
};

const addCSSLinkTag = (html: string, htmlPath: string): string => {
  const document = new DOMParser().parseFromString(
    html,
    "text/html",
  );

  const link = document.createElement("link");

  link.rel = "stylesheet";

  log.debug(htmlPath);
  log.debug(relative(htmlPath, join(htmlPath, "css/tailwind.css")));

  link.href = relative(htmlPath, join(htmlPath, "css/tailwind.css"));

  document.head.insertAdjacentHTML("afterbegin", link.toString());

  // Add title tag
  if (is.Nullish(!config.title)) {
    const title = document.createElement("title");
    title.innerText = config.title;

    document.head.insertAdjacentHTML("afterbegin", title.toString());
  }

  return document.toString();
};

const prettyHTML = (html: string): string => {
  const beautify_html = beautify.html;
  return beautify_html(html);
};
