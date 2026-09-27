// Renders each <section class="panel"> of an HTML page to <outDir>/<id>.png
// Usage: node content/storefront/render.mjs [page.html] [outDir]
//   defaults: content/storefront/storefront.html -> content/storefront/png
//   e.g.      node content/storefront/render.mjs content/brand/store-kit.html content/brand/png
// Needs playwright-core + Chromium; set CHROMIUM_PATH if Chromium isn't at Playwright's default path.
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const page = path.resolve(process.argv[2] ?? path.join(here, 'storefront.html'));
const outDir = path.resolve(process.argv[3] ?? path.join(here, 'png'));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const tab = await browser.newPage({ viewport: { width: 2000, height: 1200 } });
await tab.goto('file://' + page);
await tab.waitForLoadState('networkidle');
for (const el of await tab.$$('section.panel')) {
  const id = await el.getAttribute('id');
  await el.screenshot({ path: path.join(outDir, `${id}.png`) });
  console.log('rendered', id);
}
await browser.close();
