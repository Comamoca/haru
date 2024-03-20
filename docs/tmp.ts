import { collect } from "../kit/collect.ts";

console.log(await collect(["**/index.tsx"]));
