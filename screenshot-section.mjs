import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

const positional = process.argv.slice(2).filter(a => !a.startsWith('--'));
const url = positional[0] || 'http://localhost:3000';
const label = positional[1] || 'section';
const scrollY = parseInt(positional[2] || '0', 10);
const isMobile = process.argv.includes('--mobile');
const width = isMobile ? 390 : 1440;
const height = parseInt(positional[3] || (isMobile ? '844' : '900'), 10);

const existing = fs.readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'));
let maxNum = 0;
for (const f of existing) {
  const m = f.match(/^screenshot-(\d+)/);
  if (m) maxNum = Math.max(maxNum, parseInt(m[1]));
}
const filename = `screenshot-${maxNum+1}-${label}.png`;
const out = path.join(screenshotDir, filename);

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: out, fullPage: false });
  console.log(out);
  await browser.close();
})();
