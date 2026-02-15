const fs = require('fs');
const path = require('path');

const logos = JSON.parse(fs.readFileSync('logos.json', 'utf8'));
const outDir = path.join(__dirname, 'public', 'brands');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

for (const [name, svgContent] of Object.entries(logos)) {
    // Map names to filenames used in BrandCarousel
    let filename = '';
    if (name === 'Rolex') filename = 'rolex.svg';
    if (name === 'Patek Philippe') filename = 'patek.svg';
    if (name === 'Audemars Piguet') filename = 'audemars.svg';
    if (name === 'Omega') filename = 'omega.svg';
    if (name === 'Cartier') filename = 'cartier.svg';
    if (name === 'Vacheron Constantin') filename = 'vacheron.svg';

    if (filename) {
        fs.writeFileSync(path.join(outDir, filename), svgContent);
        console.log(`Saved ${filename}`);
    } else {
        console.log(`Skipped ${name}`);
    }
}
