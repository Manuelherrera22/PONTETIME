import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import ElegantProductCard from './ElegantProductCard';

const ProductGridSection = ({ title, brandFilter = null, limit = 6, bgColor = 'bg-white' }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWatches() {
            try {
                let query = supabase
                    .from('watches')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(limit);

                if (brandFilter) {
                    query = query.ilike('brand', `%${brandFilter}%`);
                }

                const { data, error } = await query;

                if (error) throw error;

                if (data) {
                    const formattedProducts = data.map((watch) => ({
                        id: watch.id,
                        brand: watch.brand,
                        name: watch.name,
                        price: watch.price ? `$${parseFloat(watch.price).toLocaleString()}` : 'Price on Request',
                        image: watch.image_url,
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
    }, [brandFilter, limit]);

    if (loading) {
        return (
            <section className={`py-20 ${bgColor}`}>
                <div className="container mx-auto px-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 w-48 bg-gray-200 rounded"></div>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                            {[...Array(limit)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-100 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className={`py-24 ${bgColor}`}>
            <div className="container mx-auto px-6">

                {/* Minimalist Header */}
                <div className="mb-16 text-center">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                        Discover
                    </h4>
                    <h2 className="text-3xl md:text-4xl font-serif text-luxury-black">
                        {title}
                    </h2>
                </div>

                {/* Elegant Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16 mb-20">
                    {products.map((product) => (
                        <ElegantProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pill Button */}
                <div className="text-center">
                    <Link to="/shop" className="inline-block border border-gray-300 bg-transparent text-luxury-black px-8 py-3 md:px-10 md:py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                        View All Watches
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductGridSection;
