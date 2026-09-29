// Prints memory-map.html to bridge/acmi-5min/downloads/agent-memory-map.pdf
// Run: CHROMIUM_PATH=... node content/leadmagnet/print.mjs   (needs playwright-core)
import { chromium } from 'playwright-core';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '../../bridge/acmi-5min/downloads/agent-memory-map.pdf');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const tab = await browser.newPage();
await tab.goto('file://' + path.join(here, 'memory-map.html'));
await tab.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('wrote', out);
