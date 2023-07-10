import { chromium, expect, test } from "@playwright/test";
import * as readline from 'readline';
import dotenv from "dotenv";

dotenv.config({
    path: `.env`
});
test.use({ viewport: { width: 1400, height: 1000 } });

test("Launch Naukri page", async () => {
  

  await test.step("Launch the url", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(process.env.BASE_URL);
    await page.waitForSelector('h2.premium-collection-title',{
        state: "visible"
    });
    const role = `link`
    const textofLogin = 'Login'
    const logintbn = await page.getByRole(`${role}`, { name: `${textofLogin}`, exact: true });
    await logintbn.click();
    await page.waitForTimeout(5000);

    const textplaceholder = "Enter your active Email ID / Username";
    await page.getByPlaceholder(`${textplaceholder}`).fill(process.env.USERNAME);
    await page.getByPlaceholder("Enter your password").fill(process.env.PASSWORD);

    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await page.waitForTimeout(10000);

    await page.locator('.nI-gNb-nc__icon-wrapper > .ni-gnb-icn').hover();
    await page.waitForTimeout(5000);

    await page.getByTitle('Recommended jobs').nth(0).click();

     await page.waitForTimeout(5000);
   


    // await page.waitForSelector(".ws-nowrap.s-btn.s-btn__primary",{
    //     state: 'visible'
    // });

    // const total_questions  = await page.locator('#questions > div').count();
    // await console.log(`Total questions on the page ${total_questions}`);

    // const questions_class = await page.$$eval('.s-post-summary--content',all_items=>{
    //     const data = [];
    //     all_items.forEach(questions=>{
    //         const question_name  = questions.querySelector('h3').innerText;
    //         const question_url = "https://stackoverflow.com"+questions.querySelector('h3 > a').getAttribute('href')

    //         data.push({question_name, question_url});
    //     });
    //     return data;
    // });
    // await console.log(questions_class);
    //await browser.close();
    const recommend_jobs = await page.locator('.sim-jobs').nth(0);

    const get_count_of_recommended_jobs = await page.locator('.jobs-count').nth(0).innerText();
    console.log(parseInt(get_count_of_recommended_jobs));

    
    
    
  });

});
