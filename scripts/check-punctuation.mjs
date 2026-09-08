import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const excluded = new Set([
  ".git",
  "node_modules",
  ".next",
  "out",
  "dist",
  "artifacts",
  "test-results",
  "playwright-report",
]);
const textFile = /\.(?:[cm]?[jt]sx?|json|css|html|svg|md|txt|ya?ml)$/i;
let files = 0;
let em = 0;
let en = 0;
async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name) || entry.name === "stitch.html") continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(file);
      continue;
    }
    if (
      !textFile.test(entry.name) ||
      file.includes(path.join("assets", "fonts"))
    )
      continue;
    const content = await readFile(file, "utf8");
    files++;
    for (const [index, line] of content.split(/\r?\n/).entries()) {
      const emCount = (line.match(/\u2014/g) ?? []).length;
      const enCount = (line.match(/\u2013/g) ?? []).length;
      em += emCount;
      en += enCount;
      if (emCount || enCount)
        console.error(`${file}:${index + 1}: prohibited punctuation`);
    }
  }
}
await scan(process.argv.includes("--build") ? "out" : ".");
console.log(`Scanned ${files} text files. U+2014: ${em}. U+2013: ${en}.`);
if (em || en) process.exitCode = 1;
