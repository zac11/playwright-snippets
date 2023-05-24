import { chromium, expect, test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test("Launch the Selectors hub test page", async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://docs.saucelabs.com/orchestrate/getting-started/");
  await page.waitForSelector("img[alt='Product Updates']", {
    state: "visible",
  });


    
  const linklocator = await page.locator('a');
  const links = await linklocator.all();

  for (const link of links) {
    const href = await link.getAttribute('href'); // Get the value of the href attribute
    console.log(href);
  }
  
  await browser.close();
});
