import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchWishlist();
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            const { data, error } = await supabase
                .from('wishlist')
                .select(`
                    watch_id,
                    watches:watch_id (
                        id,
                        brand,
                        name,
                        price,
                        image_url,
                        model
                    )
                `)
                .eq('user_id', user.id);

            if (error) throw error;

            // Transform data to match ProductCard expectations
            const items = data.map(item => ({
                id: item.watches.id,
                brand: item.watches.brand,
                name: item.watches.name,
                price: item.watches.price ? `$${parseFloat(item.watches.price).toLocaleString()}` : 'Price on Request',
                image: item.watches.image_url,
                description: item.watches.model,
                isNew: false
            }));

            setWishlistItems(items);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-white pt-24 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-6">
            <SEO title="My Wishlist | PonteTIME" />

            <div className="container mx-auto">
                <h1 className="text-4xl font-serif text-luxury-black mb-8 text-center">My Wishlist</h1>

                {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 mb-6">Your wishlist is empty.</p>
                        <Link to="/shop" className="bg-luxury-black text-white px-8 py-3 uppercase tracking-widest hover:bg-gray-800 transition-colors">
                            Browse Collection
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
