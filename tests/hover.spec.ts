import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test('Launch the Selectors hub test page',async()=>{

   
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://selectorshub.com/xpath-practice-page/");
    await page.waitForSelector('.dropbtn',{
        state: "visible"
    });
    
  
   // hover on this element - timeout after 5 seconds

   await page.locator('.dropbtn').hover(); 

   await page.waitForTimeout(3000);

   page.close();
 


});

