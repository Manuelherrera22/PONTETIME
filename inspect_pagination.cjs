const puppeteer = require('puppeteer');
const fs = require('fs');

async function inspect() {
    console.log('Launching...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log('Navigating to Omega...');
    await page.goto('https://www.bobswatches.com/omega', { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('Scrolling to bottom...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 2000));

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'debug_pagination.png', fullPage: false });

    console.log('Dumping footer HTML...');
    const footerHtml = await page.evaluate(() => {
        // Try to find pagination specifically
        const pagination = document.querySelector('.pagination') || document.querySelector('.pages');
        if (pagination) return pagination.outerHTML;

        // Fallback to larger dump
        return document.body.innerHTML.slice(-200000);
    });

    fs.writeFileSync('footer_dump.html', footerHtml);

    await browser.close();
    console.log('Done.');
}

inspect().catch(console.error);
