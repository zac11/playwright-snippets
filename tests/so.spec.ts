import { chromium, expect, test } from "@playwright/test";
import * as readline from 'readline';


test.use({ viewport: { width: 1400, height: 1000 } });

test("Launch the SO page with Playwright questions", async () => {
  

  await test.step("Launch the url", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://stackoverflow.com/questions/tagged/playwright");
    await page.waitForSelector(".ws-nowrap.s-btn.s-btn__primary",{
        state: 'visible'
    });

    const total_questions  = await page.locator('#questions > div').count();
    await console.log(`Total questions on the page ${total_questions}`);

    const questions_class = await page.$$eval('.s-post-summary--content',all_items=>{
        const data = [];
        all_items.forEach(questions=>{
            const question_name  = questions.querySelector('h3').innerText;
            const question_url = "https://stackoverflow.com"+questions.querySelector('h3 > a').getAttribute('href')

            data.push({question_name, question_url});
        });
        return data;
    });
    await console.log(questions_class);
    await browser.close();
  });

});
