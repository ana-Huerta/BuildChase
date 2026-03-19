const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const url = 'http://localhost:5173/';
  const outDir = 'screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 },
    { name: 'small', width: 420, height: 800 }
  ];

  for (const v of viewports) {
    try {
      await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 1 });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      // wait a bit for animations
      await page.waitForTimeout(800);
      const path = `${outDir}/${v.name}.png`;
      await page.screenshot({ path, fullPage: true });
      console.log('Saved', path);
    } catch (e) {
      console.error('Error capturing', v.name, e.message);
    }
  }

  await browser.close();
})();
