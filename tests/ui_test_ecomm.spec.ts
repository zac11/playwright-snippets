import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe(`First test`,()=>{
    test('Launch the charts page and get values',async()=>{

   
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
    
        await page.goto("https://tutorialsninja.com/demo/");
       await page.waitForTimeout(10000);
    
      
    });
})


           

