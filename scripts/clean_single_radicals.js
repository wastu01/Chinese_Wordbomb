// clean_single_radicals.js
const fs = require('fs');

// 讀檔
const srcPath = "dict_moedict.json";
const outPath = "dict_moedict_clean.json";
const words = JSON.parse(fs.readFileSync(srcPath, "utf8"));

// 過濾：如果整個詞只有 1 個字 → 刪除
const removed = [];
const kept = [];

for (const w of words) {
  const norm = w.normalize("NFKC").trim();

  // 以 code point 計數，避免 surrogate 問題
  const chars = Array.from(norm);
  if (chars.length === 1) {
    removed.push(w);
    continue; // 刪掉
  }
  kept.push(norm);
}

// 去重（保險起見）
const dedup = Array.from(new Set(kept));

// 輸出
fs.writeFileSync(outPath, JSON.stringify(dedup, null, 0), "utf8");
// 報告
console.log(`來源: ${srcPath}`);
console.log(`總筆數: ${words.length}`);
// console.log(`刪除(單字詞): ${removed.length}`);
// if (removed.length) {
//   for (const r of removed) console.log(`- ${r}`);
// }
console.log(`保留後: ${dedup.length}`);
console.log(`已寫入: ${outPath}`);
