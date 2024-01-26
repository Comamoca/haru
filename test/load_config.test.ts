import * as load_config from "../utils/load_config.ts";
import { join } from "https://deno.land/std@0.203.0/path/join.ts";
import { equal } from "https://deno.land/std@0.205.0/assert/mod.ts";

Deno.test("testing load_config", () => {
  // Deno.chdir(join(Deno.cwd(), "./test"));
  const config = load_config.config as load_config.Config;

  equal(config.output, "out");
  equal(config.input, "./testdata");
});
