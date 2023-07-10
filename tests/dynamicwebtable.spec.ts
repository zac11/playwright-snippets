import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe(`First test`,()=>{
    test('Launch the charts page and get values',async()=>{

   
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
    
        await page.goto("https://datatables.net/extensions/select/examples/initialisation/checkbox.html");
       await page.waitForTimeout(10000);

       /**
        * Select the last person in the last from Tokyo office
        */

       const search_tokyo = await page.locator(`input[type='search']`);
       await search_tokyo.fill(`Tokyo`);

       const tableLocator = await page.locator(`table#example tbody`);
       await page.waitForTimeout(5000);
       const last = await tableLocator.locator('tr').last().locator(':scope',{hasText : `Tokyo`}).locator('td.select-checkbox').click();
       await page.waitForTimeout(3000);

     
        /**
         * Print all names who have Tokyo office
         */
   
        const row = await tableLocator.locator(`tr`).locator(":scope").locator(`td.sorting_1`).allInnerTexts();
        await row.forEach((text)=>{
            console.log(text);
        })

       /**
        * Print all the text values from the second row 
        */

       await search_tokyo.clear();
       await page.waitForTimeout(3000); 
       const second_row_text = await tableLocator.locator(`tr`).nth(1).locator(`:scope`).allInnerTexts();
       await second_row_text.forEach((text)=>{
        console.log(text);
       })
       
        
    /**
     * Sort the table in descending order and then get the salaries of the 10 employees
     */

    const tableheader = await page.locator(`table#example thead`);
    await tableheader.locator(`tr`).locator(`th`).last().dblclick();
    const all_sorted_names = await tableLocator.locator(`tr`).locator(`:scope`).locator(`td.sorting_1`).allInnerTexts();
    await all_sorted_names.forEach((text)=>{
        console.log(text);
    });
    await page.waitForTimeout(3000); 
    

    
    
    });
    
   
})
