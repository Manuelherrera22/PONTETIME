import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Check, ShoppingBag, Shield, Clock, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import SkeletonCard from '../components/SkeletonCard';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    useEffect(() => {
        async function fetchProduct() {
            try {
                const { data, error } = await supabase
                    .from('watches')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex justify-center items-center">
                <div className="text-luxury-gold text-2xl font-serif animate-pulse">Loading Details...</div>
            </div>
        );
    }

    if (!product) return <div className="min-h-screen bg-white" />;

    const price = product.price ? `$${parseFloat(product.price).toLocaleString()}` : 'Price on Request';

    return (
        <div className="bg-white min-h-screen pt-32 md:pt-40 pb-12">
            <SEO
                title={`${product.brand} ${product.name}`}
                description={`Buy authentic ${product.brand} ${product.name} (Ref: ${product.model}). Certified pre-owned luxury watch. ${product.price}.`}
                image={product.image_url}
                url={`/product/${product.id}`}
            />
            <div className="container mx-auto px-6">
                <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-luxury-gold mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery Section */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-luxury-gold text-lg tracking-widest uppercase mb-2 font-bold">{product.brand}</h2>
                        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-luxury-black">{product.name}</h1>

                        <div className="text-3xl font-light mb-8 text-gray-900">{price}</div>

                        <div className="border-t border-b border-gray-200 py-6 mb-8 space-y-4">
                            <p className="text-gray-600 leading-relaxed">
                                <span className="font-bold text-luxury-black">Model / Reference:</span> {product.model || 'N/A'}
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description || `An exquisite timepiece from ${product.brand}, featuring the implementation of the finest watchmaking traditions.`}
                            </p>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className={`flex-1 ${added ? 'bg-green-600' : 'bg-luxury-black'} text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center`}
                            >
                                {added ? (
                                    <>
                                        <Check size={20} className="mr-2" /> View in Bag
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} className="mr-2" /> Add to Bag
                                    </>
                                )}
                            </button>
                            {added ? (
                                <Link
                                    to="/cart"
                                    className="flex-1 bg-luxury-gold text-white py-4 font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors flex items-center justify-center animate-in fade-in zoom-in duration-300"
                                >
                                    Go to Checkout
                                </Link>
                            ) : (
                                <button className="flex-1 border border-luxury-black text-luxury-black py-4 font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-colors">
                                    Contact Us
                                </button>
                            )}
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="flex flex-col items-center text-center">
                                <Shield className="text-luxury-gold mb-3" size={24} />
                                <span className="text-sm text-gray-500">Authenticity Guaranteed</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Clock className="text-luxury-gold mb-3" size={24} />
                                <span className="text-sm text-gray-500">24-Month Warranty</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Award className="text-luxury-gold mb-3" size={24} />
                                <span className="text-sm text-gray-500">Certified Pre-Owned</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
