import { expandGlob, WalkEntry } from "../deps.ts";

export async function collect(glob: string[]): Promise<WalkEntry[]> {
  const files: WalkEntry[] = [];

  await Promise.all(glob.map(async (item) => {
    for await (const entry of expandGlob(item)) {
      files.push(entry);
    }
  }));

  return files;
}
