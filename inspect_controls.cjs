const puppeteer = require('puppeteer');

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

    // Scroll a bit to trigger any floating elements
    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(r => setTimeout(r, 2000));

    // Find potential buttons/links
    const controls = await page.evaluate(() => {
        const candidates = [];
        const elements = document.querySelectorAll('a, button, div[role="button"]');

        elements.forEach(el => {
            const text = el.innerText.trim().toLowerCase();
            if (['next', 'load more', 'show more', 'view more', 'more results', '>'].some(keyword => text.includes(keyword)) ||
                (text.length < 5 && !isNaN(text))) { // Numbers
                candidates.push({
                    tag: el.tagName,
                    text: el.innerText.trim(),
                    class: el.className,
                    id: el.id,
                    href: el.href || null
                });
            }
        });
        return candidates;
    });

    // console.log('Found potential controls:', JSON.stringify(controls, null, 2));
    const fs = require('fs');
    fs.writeFileSync('controls.json', JSON.stringify(controls, null, 2));
    console.log('Saved to controls.json');

    await browser.close();
}

inspect().catch(console.error);
