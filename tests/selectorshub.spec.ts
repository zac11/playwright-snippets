import { chromium,test } from "@playwright/test";

test('Launch the Selectors hub test page',async()=>{
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://selectorshub.com/xpath-practice-page/");
    await page.waitForSelector('.dropbtn',{
        state: "visible"
    });

    const hrefs = await page.evaluate(() => {
        return Array.from(document.links).map(item => item.href);
      });
    
    await console.log(hrefs.length);

    await page.close();
});