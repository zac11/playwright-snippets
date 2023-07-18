const { chromium } = require('playwright');

(async () => {
    // Start browser
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Go to the website
    await page.goto('https://reqres.in/');

    // Execute fetch within page context and save the response
    const response = await page.evaluate(async () => {
        const res = await fetch('https://reqres.in/api/users');
        return res.json();
    });

    console.log(response);

    // Verify response properties
    if (response.page !== 1) {
        console.error('Page number is not correct');
    }
    if (response.per_page !== 6) {
        console.error('Per page number is not correct');
    }
    if (response.data.length !== 6) {
        console.error('Number of users is not correct');
    }

    // Close the browser
    await browser.close();
})();
