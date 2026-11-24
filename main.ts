// One-Star Review of Something Essential — make.fun entry.
// Writes a single-line, deadpan one-star review of gravity to /output/entry.txt.
// Node standard library only; no network, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 160;

const here = dirname(fileURLToPath(import.meta.url));
const review = readFileSync(join(here, "entry.txt"), "utf8");

// Runtime gate, mirroring the competition brief: 1 to 160 characters,
// not only whitespace, and a single line. The count is in characters, not
// bytes, so a multi-byte character still counts as one; trailing newlines
// in the source file are stripped before counting so the stored line and
// the gated line are the same text.
const line = review.replace(/\r\n/g, "\n").replace(/\n+$/, "");
if (line.length < 1 || line.length > MAX_CHARS) {
  throw new Error(`review must be 1 to ${MAX_CHARS} characters, got ${line.length}`);
}
if (line.trim().length === 0) {
  throw new Error("review must not be only whitespace");
}
if (line.includes("\n")) {
  throw new Error("review must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
console.log(`wrote /output/entry.txt (${line.length} characters)`);
