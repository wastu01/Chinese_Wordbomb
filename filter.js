// clean_single_char.js
import fs from "fs";

const srcPath = "dict_moedict.json";
const outPath = "dict_moedict_clean.json";

// 讀檔
const words = JSON.parse(fs.readFileSync(srcPath, "utf8"));

// 過濾：保留「字數 >= 2」的詞（用 code point 計數，避免 UTF-16 問題）
const kept = [];
let removedCount = 0;

for (const w of words) {
  if (typeof w !== "string") continue;
  const norm = w.normalize("NFKC").trim();
  if (!norm) continue;

  // 以 code point 分割計數
  const chars = Array.from(norm);
  if (chars.length >= 2) {
    kept.push(norm);
  } else {
    removedCount++;
  }
}

// 去重（保險）
const dedup = Array.from(new Set(kept));

// 寫檔
fs.writeFileSync(outPath, JSON.stringify(dedup, null, 0), "utf8");

// 報告
console.log(`來源: ${srcPath}`);
console.log(`總筆數: ${words.length}`);
console.log(`刪除(單字詞): ${removedCount}`);
console.log(`保留後: ${dedup.length}`);
console.log(`已寫入: ${outPath}`);

// "臟腑",
// "腑",
// "腑臟",