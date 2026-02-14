const https = require('https');

const url = 'https://watchservices.sothebys.com/';

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        // Look for image trends or specific known parts
        // The user wants before/after images. These might be in a slider structure.
        // Let's print out all jpg/png/webp urls found to identify them.
        const imgRegex = /https?:\/\/[^"']*\.(?:png|jpg|jpeg|webp)/gi;
        const matches = data.match(imgRegex);

        const images = matches ? matches.join('\n') : "No images found";
        const fs = require('fs');
        fs.writeFileSync('sothebys_images.txt', images);
        console.log("Images saved to sothebys_images.txt");

        // Also dump the first 2000 characters to check if it's client-side rendered mostly
        console.log("\n--- HTML PREVIEW ---\n");
        console.log(data.substring(0, 2000));
    });

}).on('error', (err) => {
    console.error('Error fetching page:', err.message);
});
