/// <reference lib="dom"/>
import { createDataTransfer } from "playwright-utilities";
import { resolve } from "node:path";
import { chromium,test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });
test('Launch the Selectors hub test page',async()=>{

   
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://cgi-lib.berkeley.edu/ex/fup.html");
    await page.waitForTimeout(5000);

   
    const dataTransfer = await createDataTransfer({
        page,
        filePath: "/Users/Rahul_Yadav/Downloads/shub.png",
        fileName: "shub.png",
        fileType: "image/png",
      });
    
    await page.dispatchEvent("input[name='upfile']", "drop", { dataTransfer });  
    await page.waitForTimeout(3000);
    await page.locator("input[value='Press']").click();
    await page.waitForTimeout(3000);
    
 });



