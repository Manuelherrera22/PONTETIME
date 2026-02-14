const { createClient } = require('@supabase/supabase-js');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Hardcoded for script use based on src/lib/supabase.js and package.json check
const SUPABASE_URL = 'https://ynrcqzkkfbtizxqvjtqk.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucmNxemtrZmJ0aXp4cXZqdHFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTA4MTY0OCwiZXhwIjoyMDg2NjU3NjQ4fQ.0ld_vlA1o8pjl7b9l2Ex7a-L4w7Ca9ZVXL7Yu6sbGqo';

// PG Client to get the list of watches and update URLs
const pgClient = new Client({
    connectionString: 'postgresql://postgres.ynrcqzkkfbtizxqvjtqk:Herrera123Musfelcrow@aws-1-us-east-1.pooler.supabase.com:5432/postgres'
});

async function migrateImages() {
    console.log('Using Service Role Key for migration...');
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    try {
        // Ensure bucket exists
        const { error: bucketError } = await supabase.storage.createBucket('watches', {
            public: true
        });
        if (bucketError && !bucketError.message.includes('already exists')) {
            console.error('Error creating bucket:', bucketError);
        } else {
            console.log('Bucket "watches" is ready.');
        }

        await pgClient.connect();
        console.log('Connected to Database.');

        const res = await pgClient.query("SELECT id, brand, model, image_url FROM watches WHERE image_url LIKE 'http%' AND image_url NOT LIKE '%supabase%'");
        const watches = res.rows;
        console.log(`Found ${watches.length} images to migrate.`);

        for (const [index, watch] of watches.entries()) {
            const imageUrl = watch.image_url;
            console.log(`[${index + 1}/${watches.length}] Processing: ${watch.brand} ${watch.model || ''}`);

            try {
                // 2. Download Image
                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // 3. Upload to Supabase
                const fileName = `${watch.brand.toLowerCase().replace(/\s+/g, '-')}-${watch.id}.jpg`;
                const { data, error } = await supabase.storage
                    .from('watches')
                    .upload(fileName, buffer, {
                        contentType: 'image/jpeg',
                        upsert: true
                    });

                if (error) {
                    console.error('  Upload failed:', error.message);
                    continue;
                }

                // 4. Update Database
                const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/watches/${fileName}`;
                await pgClient.query('UPDATE watches SET image_url = $1 WHERE id = $2', [publicUrl, watch.id]);
                console.log('  Migrated to:', publicUrl);

            } catch (err) {
                console.error('  Error processing image:', err.message);
            }
        }

        console.log('Migration Complete.');
    } catch (e) {
        console.error('Migration failed:', e);
    } finally {
        await pgClient.end();
    }
}

migrateImages();
