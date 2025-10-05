import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as OpenCC from 'opencc-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const INPUT_FILE = join(projectRoot, 'dict_moedict_clean.json');
const OUTPUT_FILE = join(projectRoot, 'dict_moedict_clean_s.json');

async function convertDictionary() {
  try {
    const converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
    const raw = await fs.readFile(INPUT_FILE, 'utf8');
    const entries = JSON.parse(raw);

    if (!Array.isArray(entries)) {
      throw new Error('Dictionary JSON should be an array of strings.');
    }

    const simplified = entries.map(entry => converter(entry));
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(simplified, null, 0), 'utf8');
    console.log(`✅ Converted ${simplified.length} entries to simplified Chinese.`);
    console.log(`📄 Output written to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
    process.exitCode = 1;
  }
}

convertDictionary();
