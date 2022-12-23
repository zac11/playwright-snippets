import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test('Open Lululemon webstie and set the location',async()=>{

   
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext({
        permissions: ['geolocation']
    });
    const page = await context.newPage();
    

    await page.goto("https://shop.lululemon.com/");
    await page.waitForTimeout(5000);

     //await page.getByText('Store Locator').click();
     //await page.locator('li:has-text("Store Locator") >> role=link[name="Store Locator"]').click();
    await page.getByTestId('desktop-hnsl').click();

    await context.setGeolocation({ longitude: 40.739957, latitude: -73.792237 });

    await console.log('Location is set');

    await page.waitForTimeout(5000);


    
});

