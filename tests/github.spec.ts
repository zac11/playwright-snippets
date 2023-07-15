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
    await page.waitForSelector(".js-selected-navigation-item.selected.subnav-item", {
      state: 'visible'
    });

    const repos = await page.$$('.Box-row');

    for (const repo of repos) {
      const name = await repo.$eval('h2', node => node.innerText.trim());
      const url = await repo.$eval('h2 a', node => 'https://github.com' + node.getAttribute('href'));
      const description = await repo.$eval('p', node => node.innerText.trim()).catch(()=>'N/A');
      const language = await repo.$eval('span[itemprop=programmingLanguage]', node => node.innerText.trim()).catch(() => 'N/A');
      const stars = await repo.$eval('.float-sm-right', node => node.innerText.trim()).catch(() => 'N/A');

      console.log({ name, url, description, language, stars});
    }

  });
});
