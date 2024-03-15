import { config } from "./load_config.ts";
import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts";
import { parse } from "path";


function startPreviewWorkers() {
  const serveWorker = new Worker(
    new URL("./worker/server.ts", import.meta.url).href,
    {
      type: "module",
      deno: {
        namespace: true,
      },
    },
  );
}

Deno.serve({
  port: 6141,
  handler: async (request) => {
    // If the request is a websocket upgrade,
    // we need to use the Deno.upgradeWebSocket helper
    if (request.headers.get("upgrade") === "websocket") {
      const { socket, response } = Deno.upgradeWebSocket(request);

      socket.onopen = () => {
        console.log("LIVERELOAD CONNECTED");
      };

      socket.onclose = () => console.log("DISCONNECTED");
      socket.onerror = (error) => console.error("ERROR:", error);

      // watch file change and reload preview.
      const isJSX = (ext: string) => ext == ".tsx" || ext == ".jsx";

      const watcher = Deno.watchFs(Deno.cwd());

      for await (const ev of watcher) {
        const path = ev.paths[0];
        const parsedPath = parse(path);

        // file changes in output directory discarded.
        if (path.indexOf(config.output) == -1) {
          if (isJSX(parsedPath.ext) && ev.kind == "modify") {
            const dt = datetime();

            console.log(`Rerender at ${dt.format("HH:mm:ss")}`);

            // Reload preview.
            try {
              socket.send("reload");
            } catch (e) {
              log.error(e);
            }
          }
        }
      }

      return response;
    } else {
      return new Response(
        "This server use live reload. If you want to show preview, try http://localhost:8080",
      );
    }
  },
});

await startPreviewWorkers();
