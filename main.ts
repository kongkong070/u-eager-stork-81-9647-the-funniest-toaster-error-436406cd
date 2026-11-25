// The Funniest Toaster Error Message — u-eager-stork-81-9647
// Writes one deadpan error line (<=120 chars) to /output/entry.txt.
// The grader runs this with node22 and mounts /output as a bind mount,
// so the output directory is created when missing but never removed.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "ERROR E-07: Toasting cancelled. The bagel was frozen, and frankly, so is our relationship.";

const MAX_CHARS = 120;

function validate(line: string): void {
  if (line.length === 0) throw new Error("entry is empty");
  if (line.length > MAX_CHARS) {
    throw new Error(`entry is ${line.length} chars, over the ${MAX_CHARS} limit`);
  }
  if (line.trim().length === 0) throw new Error("entry is only whitespace");
  // The gate requires one line of plain text: reject newlines and control chars.
  if (/[\r\n\x00-\x1f]/.test(line)) {
    throw new Error("entry must be a single line with no control characters");
  }
  if (!line.endsWith(".")) throw new Error("entry must end with a full stop");
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
