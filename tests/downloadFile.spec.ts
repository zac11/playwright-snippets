import { chromium, test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe(`First test`, () => {
    test('Launch the download page and download file', async () => {


        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto("https://www.nseindia.com/market-data/top-gainers-loosers?cat=G");
        await page.waitForSelector(`#topgainer-Table`,{
            state : `visible`
        });

        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('link', { name: 'xls Download (.csv)' })
        const download = await downloadPromise;
        // Wait for the download process to complete
        console.log(await download.path());
        // Save downloaded file somewhere
        await download.saveAs('/Users/Rahul_Yadav/Library/CloudStorage/OneDrive-McKinsey&Company/Documents/JS-TS/playwright-snippets/Downloads/download.csv');


    });
})




