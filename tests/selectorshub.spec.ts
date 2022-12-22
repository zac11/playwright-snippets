import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
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
    
  
    // we want to mask this locator
   let mask_locator  = await page.locator("a[href='https://hubs.la/Q01nPnlN0%20']");
   let mask_locator_2 = await page.locator('.dropbtn');
 

   await page.screenshot({path: 'masked.png',mask:[mask_locator, mask_locator_2]});
  
});

