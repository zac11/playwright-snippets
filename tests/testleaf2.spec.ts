import { chromium, test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe(`First test`, () => {
    test('Launch the charts page and get values', async ({page}) => {


       
        await page.goto("https://www.leafground.com/table.xhtml");
        await page.waitForSelector(".customers-table-header", {
            state: 'visible'
        });
        await page.waitForTimeout(5000);

        // selecting all the elements
        const getTableLocator = await page.locator(`tbody.ui-datatable-data.ui-widget-content`).allInnerTexts();
        getTableLocator.forEach((text)=>{
            console.table(text);
        });


        //const tableBodyLocator = await page.locator(`tbody.ui-datatable-data.ui-widget-content`).getByRole(`row`).all();
        for (const li of await page.locator(`tbody.ui-datatable-data.ui-widget-content`).getByRole(`row`).all())
         console.log(await li.locator(`td`).nth(1).allInnerTexts());


       
       





    });


})
