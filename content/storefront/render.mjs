// Renders each <section class="panel"> in storefront.html to content/storefront/png/<id>.png
// Usage: node content/storefront/render.mjs  (needs playwright-core + a Chromium binary;
// set CHROMIUM_PATH if Chromium isn't at the Playwright default path).
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: 2000, height: 1200 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.join(dir, 'storefront.html'));
for (const el of await page.$$('section.panel')) {
  const id = await el.getAttribute('id');
  await el.screenshot({ path: path.join(dir, 'png', `${id}.png`) });
  console.log('rendered', id);
}
await browser.close();
