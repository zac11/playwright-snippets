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
    const circletoclick = await parentelement.locator('g.dataset-units.dataset-line.dataset-0').locator('g >> circle');
    const x_axis = await parentelement.locator("g.x.axis g");

    const texts = await letcount.allTextContents();
    const x_axis_text = await x_axis.allTextContents();
    await console.log(`${texts}`);
    await console.log(`${x_axis_text}`);  

   const gettext = async () => {
    const secondbarparent = await page.locator('#bar-composite-1',{has: page.locator('g.bar-chart.chart-draw-area')});
    const totalbarcount = await secondbarparent.locator('g.dataset-units.dataset-bars.dataset-2').locator('g');
    const bartext = await totalbarcount.allTextContents();
    await console.log(`${bartext}`);
   }

const count2 = await circletoclick.count();
for (let i =0;i< count2;i++){
    await circletoclick.nth(i).click();
   // await console.log(`${bartext}`);
    await page.waitForTimeout(1000);
    await gettext();
    await page.waitForTimeout(1000);
    
}
  
});

           

