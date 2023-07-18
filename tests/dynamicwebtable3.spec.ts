import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe(`First test`,()=>{
    test('Launch the charts page and get values',async()=>{

   
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
    
        await page.goto("https://demo.guru99.com/test/web-table-element.php#");
        await page.waitForSelector(".dataTable",{
            state: 'visible'
        });

        const tableRows = page.locator('table.dataTable tr');
        const rowCount = await tableRows.count();

        let data = [];

        for(let i=0; i<rowCount; i++){
            let row = tableRows.nth(i);
            let companyName = await row.locator('td:nth-child(1)').allInnerTexts();
            let percentChange = await row.locator('td:nth-child(5)').allInnerTexts();
        
            // Remove the % sign and convert the string to a number
            let percentChangeNumber = Number(percentChange[0].replace('%', ''));
            
            // Check if the % Change is greater than 2.5
            if (companyName.length > 0 && percentChange.length > 0) {
                let percentChangeNumber = Number(percentChange[0].replace('%', ''));
    
                // Check if the % Change is greater than 2.5
                if (!isNaN(percentChangeNumber) && percentChangeNumber > 2.5){
                    data.push({
                        companyName: companyName[0],
                        percentChange: percentChange[0]
                    });
                }
            }
        }

        await page.waitForTimeout(3000);

        console.log(data);

        
    
    
    });
    
   
})
