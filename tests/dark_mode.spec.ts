import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test('Launch the Selectors hub test page',async()=>{

   
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.cuketest.com/playwright/docs/emulation#geolocation");
    await page.waitForSelector('h2:nth-child(7)',{
        state: "visible"
    });
    await page.waitForTimeout(2000);
    await page.close();

    
});

