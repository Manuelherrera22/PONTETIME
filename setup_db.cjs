const { Client } = require('pg');

const connectionString = 'postgresql://postgres.ynrcqzkkfbtizxqvjtqk:Herrera123Musfelcrow@aws-1-us-east-1.pooler.supabase.com:5432/postgres';

const client = new Client({
    connectionString: connectionString,
});

async function setupDatabase() {
    try {
        await client.connect();
        console.log('Connected to database.');

        const createTableQuery = `
      CREATE TABLE IF NOT EXISTS watches (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        brand TEXT NOT NULL,
        name TEXT NOT NULL,
        model TEXT,
        price NUMERIC,
        image_url TEXT,
        product_link TEXT UNIQUE,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await client.query(createTableQuery);
        console.log('Table "watches" created or already exists.');

        // Check if table exists and has columns
        const checkTable = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'watches';");
        console.log('Columns:', checkTable.rows);

    } catch (err) {
        console.error('Error setting up database:', err);
    } finally {
        await client.end();
        console.log('Disconnected.');
    }
}

setupDatabase();
