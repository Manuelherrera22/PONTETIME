const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ynrcqzkkfbtizxqvjtqk:Herrera123Musfelcrow@aws-1-us-east-1.pooler.supabase.com:5432/postgres';
const client = new Client({ connectionString });

async function fixSchema() {
    try {
        await client.connect();
        console.log('Adding unique constraint to product_link...');
        await client.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS watches_product_link_key 
            ON watches(product_link);
        `);
        console.log('Constraint added successfully.');
    } catch (err) {
        console.error('Error fixing schema:', err);
    } finally {
        await client.end();
    }
}

fixSchema();
