const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchTopWatch() {
    const { data, error } = await supabase
        .from('watches')
        .select('image_url, brand, model, price')
        .not('image_url', 'is', null) // Ensure image exists
        .order('price', { ascending: false }) // Get most expensive
        .limit(5); // Get top 5 to choose from

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    const fs = require('fs');
    let output = "Top Watches found:\n";
    data.forEach((watch, index) => {
        output += `${index + 1}. ${watch.brand} ${watch.model} - ${watch.price}\n`;
        output += `   Image: ${watch.image_url}\n`;
    });
    fs.writeFileSync('hero_candidates.txt', output);
    console.log("Data saved to hero_candidates.txt");
}

fetchTopWatch();
