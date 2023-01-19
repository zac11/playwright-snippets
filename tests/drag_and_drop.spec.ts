import { chromium, expect, test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test("Launch the Selectors hub test page", async () => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://material.angular.io/cdk/drag-drop/overview");
  await page.waitForSelector("example-viewer[id='cdk-drag-drop-overview'] div[class='docs-example-viewer-title ng-star-inserted']", {
    state: "visible",
  });

  const source = await page.locator(".cdk-drag example-box >> text=Drag me around");
  const target = await page.locator(".cdk-drag example-box >> text=Drag me around");

  await page.waitForTimeout(3000);

  await source.dragTo(target, {
    sourcePosition: { x: 14, y: 2 },
    targetPosition: { x: 121, y: 15 },
  });

  await page.waitForTimeout(3000);
  await page.close();

  
});
