const fs = require('fs');
const https = require('https');
const path = require('path');

// Using gilbarbara/logos repository which is a reliable source for vector logos
const brands = [
    { name: 'rolex', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/rolex.svg' },
    { name: 'patek', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/patek-philippe.svg' },
    { name: 'audemars', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/audemars-piguet.svg' },
    { name: 'omega', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/omega.svg' },
    { name: 'cartier', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/cartier.svg' },
    { name: 'vacheron', url: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/vacheron-constantin.svg' }
];

const downloadDir = path.join(__dirname, 'public', 'brands');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

brands.forEach(brand => {
    const file = fs.createWriteStream(path.join(downloadDir, `${brand.name}.svg`));

    https.get(brand.url, function (response) {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${brand.name}.svg`);
            });
        } else {
            console.error(`Failed to download ${brand.name}.svg: Status Code ${response.statusCode}`);
            file.close();
            if (fs.existsSync(path.join(downloadDir, `${brand.name}.svg`))) {
                fs.unlinkSync(path.join(downloadDir, `${brand.name}.svg`));
            }
        }
    }).on('error', function (err) {
        console.error(`Error downloading ${brand.name}.svg: ${err.message}`);
        if (fs.existsSync(path.join(downloadDir, `${brand.name}.svg`))) {
            fs.unlinkSync(path.join(downloadDir, `${brand.name}.svg`));
        }
    });
});
