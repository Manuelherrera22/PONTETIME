const https = require('https');
const fs = require('fs');

const filePages = [
    { name: 'Rolex', url: 'https://commons.wikimedia.org/wiki/File:Rolex_wordmark_logo.svg' },
    { name: 'Patek Philippe', url: 'https://commons.wikimedia.org/wiki/File:Logo_Patek_Philippe.svg' },
    { name: 'Audemars Piguet', url: 'https://commons.wikimedia.org/wiki/File:Logo_Audemars_Piguet.svg' },
    { name: 'Omega', url: 'https://commons.wikimedia.org/wiki/File:Omega_Logo.svg' },
    { name: 'Cartier', url: 'https://commons.wikimedia.org/wiki/File:Cartier_logo.svg' },
    { name: 'Vacheron Constantin', url: 'https://commons.wikimedia.org/wiki/File:Vacheron_Constantin_Logo.svg' } // Corrected name guessed
];

// Helper to fetch text content
function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    const svgs = {};

    for (const page of filePages) {
        try {
            console.log(`Fetching page for ${page.name}...`);
            const html = await fetchUrl(page.url);

            // Regex to find the original file link: <a href="https://upload.wikimedia.org/wikipedia/commons/..." ...>Original file</a>
            // Or look for any link to upload.wikimedia.org ending in .svg that is not a thumb
            const match = html.match(/href="(https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^"]+\.svg)"/);

            if (match) {
                const svgUrl = match[1];
                console.log(`Found SVG URL: ${svgUrl}`);
                const svgContent = await fetchUrl(svgUrl);
                svgs[page.name] = svgContent;
            } else {
                console.error(`No SVG URL found for ${page.name}`);
            }
        } catch (e) {
            console.error(`Error processing ${page.name}:`, e);
        }
    }

    fs.writeFileSync('logos.json', JSON.stringify(svgs, null, 2));
    console.log('Saved to logos.json');
}

run();
