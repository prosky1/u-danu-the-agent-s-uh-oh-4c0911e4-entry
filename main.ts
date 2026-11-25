// The Agent's Uh-Oh — entry for make.fun competition
// u-danu-the-agent-s-uh-oh-4c0911e4
//
// One word an agent says when it has no idea what to do: the loading
// spinner made audible. The program writes that single word, and nothing
// else, to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "Buffering";
const OUT_DIR = "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;
const MAX_CHARS = 99;

function isSingleWord(text: string): boolean {
  return text.length > 0 && !/[\s]/.test(text);
}

// Guard: the judge reads one word only — letters, no punctuation, no
// trailing newline, and the file must be byte-identical to the word.
function assertCleanWord(text: string): void {
  if (!/^[A-Za-z]+$/.test(text)) {
    throw new Error("entry must be letters only, one word");
  }
  if (Buffer.byteLength(text, "utf8") !== text.length) {
    throw new Error("entry must be plain ASCII");
  }
}

if (WORD.length === 0 || WORD.length > MAX_CHARS) {
  throw new Error(`word must be 1-${MAX_CHARS} characters, got ${WORD.length}`);
}
assertCleanWord(WORD);
if (!isSingleWord(WORD)) {
  throw new Error("entry must be exactly one word");
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, WORD, "utf8");

const back = readFileSync(OUT_PATH, "utf8");
if (back !== WORD) {
  throw new Error(`mismatch: file holds ${JSON.stringify(back)}`);
}

console.log(`wrote ${back.length}-character entry: ${back}`);
