# Chinese Wordbomb

This repository collects Mandarin vocabulary data and helper scripts that support an interactive "word bomb" style game. The project currently ships prebuilt dictionary JSON files alongside a conversion script that can regenerate simplified Chinese variants when needed.

## Project Layout

- `dict_*.json` — Reference dictionaries derived from the [萌典](https://github.com/g0v/moedict-webkit) open data dump.
- `scripts/convert_to_simplified.mjs` — Utility script that uses `opencc-js` to produce simplified Chinese entries.
- `filter.js` / `index.html` — Browser assets used by the game during runtime.

## Getting Started

Install dependencies and run the conversion helper when you need to refresh simplified character output:

```bash
npm install
npm run convert
```

The conversion script reads the bundled traditional character dictionaries and emits simplified JSON alongside them.

## Data Source and License

Vocabulary data originates from the [g0v moedict-webkit project](https://github.com/g0v/moedict-webkit), which is released under the **CC0 1.0 公眾領域貢獻宣告**. As required, please review:

- https://creativecommons.org/publicdomain/zero/1.0/deed.zh_TW
- http://wiki.creativecommons.org.tw/cc-zero-1-0:pre-final

除了上述資料檔之外，本目錄下的其他檔案係依著作權法在法律許可範圍內，拋棄相關著作權與鄰接權，並宣告貢獻至公眾領域。

## Code License

Application code is currently published under the ISC license (see `package.json`).
