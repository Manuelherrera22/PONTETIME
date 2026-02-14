const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ynrcqzkkfbtizxqvjtqk:Herrera123Musfelcrow@aws-1-us-east-1.pooler.supabase.com:5432/postgres';

const client = new Client({
    connectionString: connectionString,
});

async function checkDatabase() {
    try {
        await client.connect();
        const res = await client.query('SELECT brand, count(*) FROM watches GROUP BY brand');
        console.log('--- Watch Counts by Brand ---');
        res.rows.forEach(row => {
            console.log(`${row.brand}: ${row.count}`);
        });
        console.log('-----------------------------');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.end();
    }
}

checkDatabase();
