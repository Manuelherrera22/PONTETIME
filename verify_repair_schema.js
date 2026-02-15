import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log('Checking repair_requests table...');
    const { data, error } = await supabase
        .from('repair_requests')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error accessing repair_requests:', error);
    } else {
        console.log('repair_requests table accessible. Sample:', data);
    }

    console.log('\nChecking storage buckets...');
    const { data: buckets, error: bucketError } = await supabase
        .storage
        .listBuckets();

    if (bucketError) {
        console.error('Error listing buckets:', bucketError);
    } else {
        console.log('Buckets:', buckets.map(b => b.name));
        const repairBucket = buckets.find(b => b.name === 'repair-photos');
        if (!repairBucket) {
            console.log('Creating repair-photos bucket...');
            const { data: newBucket, error: createError } = await supabase
                .storage
                .createBucket('repair-photos', {
                    public: true
                });
            if (createError) console.error('Error creating bucket:', createError);
            else console.log('Bucket created:', newBucket);
        } else {
            console.log('repair-photos bucket exists.');
        }
    }
}

checkSchema();
