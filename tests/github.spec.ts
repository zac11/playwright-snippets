import { chromium, expect, test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });

test("Launch the Selectors hub test page", async () => {
  await test.step("Loggin into Github", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://github.com/trending");
    await page.waitForSelector(".js-selected-navigation-item.selected.subnav-item",{
        state: 'visible'
    });

    const article_locator = page.locator('article')


  });
});
