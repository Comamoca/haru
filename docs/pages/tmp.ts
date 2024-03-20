import { collect } from "../../utils/collect.ts";

const mds = await collect(["./pages/*.md"]);

console.log(mds);
