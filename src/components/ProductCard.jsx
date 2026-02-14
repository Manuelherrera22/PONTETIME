import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (user) {
            checkWishlist();
        }
    }, [user, product.id]);

    const checkWishlist = async () => {
        const { data } = await supabase
            .from('wishlist')
            .select('*')
            .eq('user_id', user.id)
            .eq('watch_id', product.id)
            .maybeSingle(); // Use maybeSingle to avoid 406 error if multiple found (though unique constraint exists)

        setIsWishlisted(!!data);
    };

    const toggleWishlist = async (e) => {
        e.preventDefault(); // Prevent navigating to product page
        e.stopPropagation();

        if (!user) {
            navigate('/login');
            return;
        }

        if (isWishlisted) {
            await supabase
                .from('wishlist')
                .delete()
                .eq('user_id', user.id)
                .eq('watch_id', product.id);
            setIsWishlisted(false);
        } else {
            await supabase
                .from('wishlist')
                .insert([{ user_id: user.id, watch_id: product.id }]);
            setIsWishlisted(true);
        }
    };

    return (
        <Link to={`/product/${product.id}`} className="group block h-full">
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-100 rounded-sm overflow-hidden h-full flex flex-col relative shadow-sm hover:shadow-md transition-shadow duration-300"
            >
                {/* Wishlist Button */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-all shadow-sm group/heart"
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
                </button>

                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                    />
                    {product.isNew && (
                        <div className="absolute top-3 left-3 bg-luxury-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                            New Arrival
                        </div>
                    )}
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between relative bg-white transition-colors duration-300 group-hover:bg-gray-50">
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{product.brand}</p>
                        <h3 className="font-serif text-lg text-luxury-black mb-2 leading-tight group-hover:text-luxury-gold transition-colors">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                        <span className="font-bold text-luxury-black text-lg">{product.price}</span>
                        <span className="text-xs text-luxury-gold uppercase tracking-widest hover:underline">View Details</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
