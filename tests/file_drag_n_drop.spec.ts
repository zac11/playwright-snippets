/// <reference lib="dom"/>
import * as fs from 'fs';
import * as path from 'path';
import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test('Launch the Selectors hub test page',async()=>{

   
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://stackblitz.com/edit/p1uwvf-pgvw43?file=index.html");
    await page.waitForTimeout(10000);

const buffer = fs.readFileSync('/Users/Rahul_Yadav/Downloads/1436_LifeInsurancePolicies2.pdf');
 
// Create the DataTransfer and File
const dataTransfer = await page.evaluateHandle((data) => {
    const dt = new DataTransfer();
    // Convert the buffer to a hex array
    const file = new File([data.toString('hex')], 'file.pdf', { type: 'application/pdf' });
    dt.items.add(file);
    return dt;
}, buffer);
 
// Now dispatch
const elementlocator =  page.frameLocator("iframe[title='Preview page']").getByTitle('Browse...');
await page.dispatchEvent(elementlocator, 'drop', { dataTransfer }); // this needs to be looked upon
    await page.waitForTimeout(2000);

    await page.close();

    
});



