import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test('Launch the charts page and get values',async()=>{

   
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://frappe.io/charts");
    await page.waitForSelector('#line-composite-1',{
        state: "visible"
    });
    
    const parentelement = await page.locator('#line-composite-1', { has: page.locator('g.line-chart.chart-draw-area') });
    const letcount = await parentelement.locator('g.dataset-units.dataset-line.dataset-0').locator('g');
    const texts = await letcount.allTextContents();   
    await console.log(`${texts}`);
   

 


  
});

