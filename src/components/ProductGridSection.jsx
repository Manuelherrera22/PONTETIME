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
                <div className="mb-12 pl-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
                        SHOP
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-serif text-luxury-black">
                        {title}
                    </h2>
                </div>

                {/* Elegant Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12 mb-16">
                    {products.map((product) => (
                        <ElegantProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pill Button */}
                <div className="pl-4">
                    <Link to="/shop" className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Show More Watches
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductGridSection;
