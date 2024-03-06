/// <reference lib="deno.unstable" />
import { collect } from "../utils/collect.ts";
// import { join } from "https://deno.land/std@0.203.0/path/join.ts";
import { assert } from "assert";
import { resolve } from "path";

const target = ["**/index.jsx", "**/index.tsx"];

Deno.test("testing collect", async () => {
  // move to test directory

  const expected = await collect(target);
  const actual = [
    {
      path: "/home/coma/.ghq/github.com/Comamoca/haru/index.tsx",
      name: "index.tsx",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
    },
    {
      path:
        "/home/coma/.ghq/github.com/Comamoca/haru/test/testdata/innner/index.jsx",
      name: "index.jsx",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
    },
    {
      path: "/home/coma/.ghq/github.com/Comamoca/haru/test/testdata/index.tsx",
      name: "index.tsx",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
    },
  ];

  // Promise.all returned array order is ramdom. So, I use findIndex
  const issame =
    (expected.findIndex((item) => item.path == actual[0].path) != -1) &&
    (expected.findIndex((item) => item.path == actual[1].path) != -1);

  // expected has two items in actual
  assert(issame);
});

// 1880
