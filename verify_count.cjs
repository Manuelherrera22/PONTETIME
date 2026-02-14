const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ynrcqzkkfbtizxqvjtqk:Herrera123Musfelcrow@aws-1-us-east-1.pooler.supabase.com:5432/postgres';
const client = new Client({ connectionString });

async function verify() {
    try {
        await client.connect();
        const res = await client.query('SELECT count(*) FROM watches');
        const brandRes = await client.query('SELECT brand, count(*) FROM watches GROUP BY brand');
        const fs = require('fs');
        const output = `Total: ${res.rows[0].count}\nBy Brand: ${JSON.stringify(brandRes.rows, null, 2)}`;
        fs.writeFileSync('count.txt', output);
        console.log('Saved to count.txt');

        await client.end();
    } catch (e) {
        console.error(e);
    }
}

verify();
