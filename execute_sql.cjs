const { Client } = require('pg');
const fs = require('fs');

const connectionString = 'postgresql://postgres.ynrcqzkkfbtizxqvjtqk:Herrera123Musfelcrow@aws-1-us-east-1.pooler.supabase.com:5432/postgres';
const client = new Client({ connectionString });

async function executeSql() {
    try {
        await client.connect();
        const sql = fs.readFileSync('setup_storage.sql', 'utf8'); // Changed file
        console.log('Executing SQL...');
        await client.query(sql);
        console.log('SQL executed successfully.');
        await client.end();
    } catch (e) {
        console.error('Error executing SQL:', e);
        process.exit(1);
    }
}

executeSql();
