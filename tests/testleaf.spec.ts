import { chromium, test } from "@playwright/test";

test.use({ viewport: { width: 1400, height: 1000 } });

test.describe(`First test`, () => {
    test('Launch the charts page and get values', async ({page}) => {


        // const browser = await chromium.launch({
        //     headless: false
        // });
        // const context = await browser.newContext();
        // const page = await context.newPage();

        await page.goto("https://www.leafground.com/table.xhtml");
        await page.waitForSelector(".customers-table-header", {
            state: 'visible'
        });
        await page.waitForTimeout(5000);

        // selecting all the elements
        const elements = page.locator('div.ui-progressbar-value.ui-widget-header.ui-corner-all');

        // get the count of elements
        const elementsCount = await elements.count();

        
  for (let i = 0; i < elementsCount; i++) {
    // get style attribute for each element
    const styleAttribute = await elements.nth(i).getAttribute('style');

    // check if style attribute is not null
    if(styleAttribute !== null) {
      // split the styles into an array
      const styles = styleAttribute.split(';');

      // find the width style
      const widthStyle = styles.find(style => style.trim().startsWith('width'));

      // check if width style is found
      if(widthStyle !== undefined) {
        // get the width value
        const widthValue = widthStyle.split(':')[1].trim();
        console.log(`Width value for element ${i+1}: ${widthValue}`);
      } else {
        console.log(`Width style not found for element ${i+1}`);
      }
    } else {
      console.log(`Style attribute not found for element ${i+1}`);
    }
  }



       





    });


})
