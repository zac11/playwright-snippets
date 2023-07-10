import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test('Launch blinkit page and set a location',async()=>{

   
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext({
        permissions: ['geolocation']
    });
    const page = await context.newPage();
    

    await page.goto("https://blinkit.com");
    await page.waitForTimeout(5000);

    await page.getByText("Detect my location").click();

    await context.setGeolocation({ longitude: 28.5311541, latitude: 77.3899336 });

    await console.log('Location is set');

    await page.waitForTimeout(5000);


  
});

