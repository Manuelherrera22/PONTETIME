const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { Client } = require('pg');

// Database Connection
const connectionString = 'postgresql://postgres.ynrcqzkkfbtizxqvjtqk:Herrera123Musfelcrow@aws-1-us-east-1.pooler.supabase.com:5432/postgres';
const dbClient = new Client({ connectionString });

const BRANDS = [
    { name: 'Rolex', url: 'https://www.bobswatches.com/rolex' },
    { name: 'Omega', url: 'https://www.bobswatches.com/omega' },
    { name: 'Patek Philippe', url: 'https://www.bobswatches.com/patek-philippe' },
    { name: 'Audemars Piguet', url: 'https://www.bobswatches.com/audemars-piguet' },
    { name: 'Tudor', url: 'https://www.bobswatches.com/tudor' },
    { name: 'Cartier', url: 'https://www.bobswatches.com/cartier' }
];

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                // Stop scrolling if we've reached the bottom OR if we've scrolled a massive amount
                if (totalHeight >= scrollHeight - window.innerHeight || totalHeight > 300000) { // Increased limit even more
                    // Wait a bit to see if content loads
                    setTimeout(() => {
                        var newScrollHeight = document.body.scrollHeight;
                        if (newScrollHeight > scrollHeight) {
                            // Content loaded, continue scrolling
                            // (Logic resumes next interval)
                        } else {
                            // No new content, stop
                            clearInterval(timer);
                            resolve();
                        }
                    }, 2000); // Wait 2s for lazy load
                }
            }, 100);
        });
    });
}

async function scrapeBrand(page, brand) {
    console.log(`Navigating to ${brand.url}...`);
    let allWatches = [];
    let pageNum = 1;

    try {
        await page.goto(brand.url, { waitUntil: 'networkidle2', timeout: 60000 });

        while (true) {
            console.log(`Scraping ${brand.name} Page ${pageNum}...`);
            await autoScroll(page); // Still scroll to trigger lazy loaded images

            const watches = await page.evaluate((brandName) => {
                const items = Array.from(document.querySelectorAll('.seocart_ProductWrapper'));
                return items.map(wrapper => {
                    let data = {};
                    data.brand = brandName;

                    // JSON-LD Parsing
                    const scripts = wrapper.querySelectorAll('script[type="application/ld+json"]');
                    if (scripts.length > 0) {
                        try {
                            for (let script of scripts) {
                                const json = JSON.parse(script.innerText);
                                if (json['@type'] === 'Product') {
                                    data.name = json.name;
                                    data.price = json.offers ? json.offers.price : '';
                                    data.image = json.image && json.image.length > 0 ? json.image[0].url : '';
                                    data.link = json.url;
                                    data.model = json.mpn;
                                    break;
                                }
                            }
                        } catch (e) { }
                    }

                    // Fallbacks
                    if (!data.name) data.name = wrapper.querySelector('.seocart_ProductName')?.innerText.trim();
                    if (!data.model) data.model = wrapper.querySelector('.seocart_ProductModelNum')?.innerText.trim();
                    if (data.name && data.model && !data.name.includes(data.model)) data.name = `${data.name} ${data.model}`;

                    if (!data.price) {
                        const priceEl = wrapper.querySelector('[itemprop="price"], .buyPriceText span[content]');
                        data.price = priceEl?.getAttribute('content') || priceEl?.innerText.replace(/[^0-9.]/g, '');
                    }

                    if (!data.image) {
                        const pic = wrapper.querySelector('bui-picture');
                        data.image = pic?.getAttribute('img-src') || pic?.getAttribute('src');
                        if (data.image && !data.image.startsWith('http')) data.image = 'https://www.bobswatches.com' + data.image;
                    }

                    if (!data.link) data.link = wrapper.querySelector('a')?.href;

                    return data;
                }).filter(w => w.name && w.price && w.image);
            }, brand.name);

            console.log(`Found ${watches.length} watches on page ${pageNum}.`);
            allWatches = [...allWatches, ...watches];

            // Save immediately to avoid memory loss if crash
            await saveToDatabase(watches);

            // Check for Next Button
            const nextButton = await page.$('a.pageNextBtn');
            if (nextButton) {
                console.log('Next page button found. Clicking...');
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
                    nextButton.click()
                ]);
                pageNum++;
            } else {
                console.log('No more pages.');
                break;
            }
        }

        return allWatches;

    } catch (error) {
        console.error(`Error scraping ${brand.name}:`, error);
        return allWatches;
    }
}

async function saveToDatabase(watches) {
    if (watches.length === 0) return;
    console.log(`Saving ${watches.length} watches to database...`);

    // Using UPSERT based on product_link (assuming it's unique)
    const query = `
        INSERT INTO watches (brand, name, model, price, image_url, product_link, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (product_link) DO UPDATE SET
            price = EXCLUDED.price,
            image_url = EXCLUDED.image_url,
            name = EXCLUDED.name,
            model = EXCLUDED.model;
    `;

    for (const watch of watches) {
        try {
            // Clean price (remove commas, currency symbols)
            let priceVal = parseFloat(watch.price.toString().replace(/[^0-9.]/g, ''));
            if (isNaN(priceVal)) priceVal = 0; // Default to 0 if price is invalid

            await dbClient.query(query, [
                watch.brand,
                watch.name,
                watch.model,
                priceVal,
                watch.image,
                watch.link,
                watch.name
            ]);
        } catch (err) {
            console.error(`Error saving watch ${watch.name}:`, err.message);
        }
    }
}

async function run() {
    console.log('Connecting to DB...');
    await dbClient.connect();

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    let allWatches = [];

    for (const brand of BRANDS) {
        // Scrape brand returns all watches, but they are already saved page-by-page.
        const watches = await scrapeBrand(page, brand);
        allWatches = [...allWatches, ...watches];
        // Wait a bit between brands
        await new Promise(r => setTimeout(r, 2000));
    }

    console.log(`Total watches scraped: ${allWatches.length}`);

    await browser.close();
    await dbClient.end();
}

run().catch(console.error);
