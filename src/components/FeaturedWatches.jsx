import ProductCard from './ProductCard';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import ElegantProductCard from './ElegantProductCard';

const FeaturedWatches = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWatches() {
            try {
                // Fetch latest 6 watches
                const { data, error } = await supabase
                    .from('watches')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(6); // Scrape enough to fill the row

                if (error) throw error;

                if (data) {
                    const formattedProducts = data.map((watch, index) => ({
                        id: watch.id,
                        brand: watch.brand,
                        name: watch.name,
                        price: `$${parseFloat(watch.price).toLocaleString()}`,
                        description: `Reference: ${watch.model}`,
                        image: watch.image_url,
                        isNew: index < 2,
                    }));
                    setProducts(formattedProducts);
                }
            } catch (error) {
                console.error('Error fetching watches:', error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchWatches();
    }, []);
    if (loading) {
        return (
            <section className="py-20 bg-luxury-black flex justify-center items-center min-h-[400px]">
                <div className="text-luxury-gold text-2xl font-serif animate-pulse">Loading Collection...</div>
            </section>
        );
    }



    // ... (existing imports and useEffect)

    if (loading) {
        // ... (loading state)
    }

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">

                {/* Minimalist Header */}
                <div className="mb-16 pl-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
                        SHOP
                    </h4>
                    <h2 className="text-5xl md:text-6xl font-serif text-luxury-black">
                        Rolex Watches
                    </h2>
                </div>

                {/* Elegant Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12 mb-20">
                    {products.map((product) => (
                        <ElegantProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pill Button */}
                <div className="pl-4">
                    <button className="bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Show All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedWatches;
