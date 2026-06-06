/**
 * One-off: captures viewport screenshots for portfolio cards.
 * Run: npm run capture:portfolio (after `npx playwright install chromium`)
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'portfolio');

const targets = [
  { url: 'https://kasperleng.vercel.app/', file: 'kasper-leng.jpg' },
  { url: 'https://eddiehan.vercel.app/', file: 'eddie-han.jpg' },
  { url: 'https://www.solo-pocha.ca/', file: 'solo-pocha.jpg' },
  { url: 'https://osanoai.vercel.app/', file: 'osanoai.jpg' },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const { url, file } of targets) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 2000));
      const path = join(outDir, file);
      await page.screenshot({
        path,
        type: 'jpeg',
        quality: 88,
        fullPage: false,
      });
      console.log('OK', file);
    } catch (e) {
      console.error('FAIL', url, e.message);
      process.exitCode = 1;
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}
