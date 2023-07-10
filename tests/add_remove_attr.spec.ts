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
    
    await page.waitForTimeout(5000);


    // set disabled attribute
    await page.evaluate(()=>{
        const selector = document.querySelector("input[placeholder$='Enter your company']");
        selector.setAttribute('disabled','disabled');
    });

    await page.waitForTimeout(5000);

    // now remove the attribute and make the input enabled
    await page.evaluate(()=>{
        const selector = document.querySelector("input[placeholder$='Enter your company']");
        selector.removeAttribute('disabled')
    });

    await page.waitForTimeout(2000);

    await page.locator("div[class='element-companyId'] input[placeholder='Enter your company']").fill('Google');

    await page.screenshot({path: "attribute.png"});

    
});

