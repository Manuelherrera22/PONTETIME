const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres.ynrcqzkkfbtizxqvjtqk:Herrera123Musfelcrow@aws-1-us-east-1.pooler.supabase.com:5432/postgres';
const client = new Client({ connectionString });
const SITE_URL = 'https://pontetime.com';

async function generateSitemap() {
    try {
        await client.connect();

        console.log('Fetching products...');
        const res = await client.query('SELECT id, created_at FROM watches');
        const products = res.rows;

        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Static Pages -->
    <url>
        <loc>${SITE_URL}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${SITE_URL}/shop</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${SITE_URL}/sell</loc>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>
    <url>
        <loc>${SITE_URL}/services</loc>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>

    <!-- Dynamic Product Pages -->
`;

        products.forEach(p => {
            sitemap += `    <url>
        <loc>${SITE_URL}/product/${p.id}</loc>
        <lastmod>${new Date(p.created_at).toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>
`;
        });

        sitemap += `</urlset>`;

        const publicPath = path.join(__dirname, 'public', 'sitemap.xml');
        fs.writeFileSync(publicPath, sitemap);
        console.log(`Sitemap generated with ${products.length} products at ${publicPath}`);

        await client.end();
    } catch (e) {
        console.error('Error generating sitemap:', e);
        process.exit(1);
    }
}

generateSitemap();
