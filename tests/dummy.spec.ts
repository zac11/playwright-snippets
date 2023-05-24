import { chromium, expect, test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });

test("Launch Sample Page", async () => {
  

  await test.step("Launch the url", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://bookcart.azurewebsites.net/");
    await page.waitForSelector("input[placeholder='Search books or authors']",{
        state: "visible"
    });

    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForSelector("input[placeholder='Search books or authors']",{
        state: "visible"
    });

    await page.fill("input[formcontrolname='username']","ortoni");
    await page.fill("input[formcontrolname='password']","Pass1234");
    await page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();


    await page.waitForTimeout(10000)

    await page.getByRole('button').filter({hasText: `arrow_drop_down`}).click();
    await page.waitForTimeout(2000);
;
    await page.locator("button[class='mat-focus-indicator mat-menu-trigger mat-button mat-button-base ng-star-inserted'] span[class='mat-button-wrapper']").isVisible();

    await page.getByPlaceholder('Search books or authors').fill("Roomies");
    await page.locator("mat-option[role='option']").click();

    await page.waitForTimeout(5000);


   
    
    
  });

});
