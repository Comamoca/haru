import { render } from "./render.ts";
import { collect } from "./collect.ts";
import { config } from "./load_config.ts";

const outdir = config.output;
const glob_array = ["**/index.tsx", "**/index.jsx"];
const target_jsx = await collect(glob_array);

render(outdir, glob_array, target_jsx);
