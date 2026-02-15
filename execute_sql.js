import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const { Client } = pg;

// Replicate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
console.log(`Loading .env from: ${envPath}`);

if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    if (result.error) {
        console.error('Error loading .env.local:', result.error);
    } else {
        console.log('.env.local loaded successfully.');
    }
} else {
    console.error('.env.local file NOT found at:', envPath);
}

const sqlFile = process.argv[2];

if (!sqlFile) {
    console.error('Please provide an SQL file to execute.');
    process.exit(1);
}

// Check all possible environment variables for the connection string
const connectionString =
    process.env.SUPABASE_DB_URL ||
    process.env.DATABASE_URL ||
    process.env.VITE_SUPABASE_DB_URL;

if (!connectionString) {
    console.error('No database connection string found in .env.local (SUPABASE_DB_URL, DATABASE_URL, or VITE_SUPABASE_DB_URL).');
    console.log('Available Env Keys:', Object.keys(process.env).filter(k => k.includes('SUPABASE')));
    process.exit(1);
}

const client = new Client({
    connectionString: connectionString,
});

async function executeSql() {
    try {
        await client.connect();
        const sql = fs.readFileSync(path.resolve(sqlFile), 'utf8');
        console.log(`Executing SQL from ${sqlFile}...`);
        await client.query(sql);
        console.log('SQL executed successfully.');
    } catch (err) {
        console.error('Error executing SQL:', err);
    } finally {
        await client.end();
    }
}

executeSql();
