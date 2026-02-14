
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ProductGridSection from '../components/ProductGridSection';
import SEO from '../components/SEO';

import SkeletonCard from '../components/SkeletonCard';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter States
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]); // [min, max]
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'price_asc', 'price_desc'

    const AVAILABLE_BRANDS = [
        'Rolex', 'Omega', 'Patek Philippe', 'Audemars Piguet',
        'Panerai', 'Cartier', 'Tudor', 'Oris'
    ];

    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const ITEMS_PER_PAGE = 24;

    // Initialize filters from URL
    useEffect(() => {
        const brandParam = searchParams.get('brand');
        if (brandParam) {
            setSelectedBrands([brandParam]);
        }
    }, [searchParams]);

    // Reset products when filters change
    useEffect(() => {
        setProducts([]);
        setPage(0);
        setLoading(true);
        fetchWatches(0, true);
    }, [selectedBrands, priceRange, sortBy]); // Re-fetch on filter change

    async function fetchWatches(pageIndex = 0, isNewFilter = false) {
        try {
            if (!isNewFilter) setLoading(true);

            let query = supabase
                .from('watches')
                .select('*', { count: 'exact' });

            // Apply Sort
            if (sortBy === 'newest') query = query.order('created_at', { ascending: false });
            if (sortBy === 'price_asc') query = query.order('price', { ascending: true });
            if (sortBy === 'price_desc') query = query.order('price', { ascending: false });

            // Pagination
            query = query.range(pageIndex * ITEMS_PER_PAGE, (pageIndex + 1) * ITEMS_PER_PAGE - 1);

            // Apply Filters
            if (selectedBrands.length > 0) {
                query = query.in('brand', selectedBrands);
            }

            if (priceRange[1] < 100000) { // Only filter if not max
                query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);
            }

            const { data, count, error } = await query;

            if (error) throw error;

            if (data) {
                const formattedProducts = data.map((watch) => ({
                    id: watch.id,
                    brand: watch.brand,
                    name: watch.name,
                    priceRaw: parseFloat(watch.price),
                    price: watch.price ? `$${parseFloat(watch.price).toLocaleString()} ` : 'Price on Request',
                    description: `Reference: ${watch.model} `,
                    image: watch.image_url,
                    isNew: false,
                }));

                setProducts(prev => isNewFilter ? formattedProducts : [...prev, ...formattedProducts]);
                if (count !== null) setTotalCount(count);
            }
        } catch (error) {
            console.error('Error fetching watches:', error.message);
        } finally {
            setLoading(false);
        }
    }

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchWatches(nextPage, false);
    };

    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    // Client-side filtering is no longer needed/used for display, but we keep the UI logic
    // We display `products` directly now.
    const displayProducts = products;

    if (loading) {
        return (
            <section className="min-h-screen bg-white text-luxury-black pt-24 pb-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Skeleton Sidebar */}
                        <aside className="hidden md:block w-64 flex-shrink-0">
                            <div className="bg-white border border-gray-100 p-6 rounded-lg space-y-8 animate-pulse shadow-sm">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 w-full bg-gray-200 rounded" />)}
                                </div>
                            </div>
                        </aside>

                        {/* Skeleton Grid */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <SkeletonCard key={i} />)}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-white text-luxury-black pt-32 md:pt-40 pb-12">
            <SEO
                title="Shop Luxury Watches | Full Collection"
                description="Browse our complete inventory of Rolex, Omega, Patek Philippe, and more. Filter by brand and price to find your perfect timepiece."
            />
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif mb-2 text-luxury-black">The Collection</h1>
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-gray-500 text-sm">
                                    Showing {products.length} results
                                </p>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Sort by:</span>
                                    <div className="relative">
                                        <select
                                            className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-8 text-sm focus:outline-none focus:border-luxury-gold"
                                            onChange={(e) => setSortBy(e.target.value)}
                                            defaultValue={sortBy}
                                        >
                                            <option value="newest">Newest Arrivals</option>
                                            <option value="price_asc">Price: Low to High</option>
                                            <option value="price_desc">Price: High to Low</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="mt-4 md:mt-0 flex items-center gap-2 text-luxury-gold border border-luxury-gold px-4 py-2 hover:bg-luxury-gold hover:text-white transition-colors md:hidden"
                    >
                        <Filter size={18} /> Filters
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className={`md: w - 64 flex - shrink - 0 ${isFilterOpen ? 'block' : 'hidden md:block'} `}>
                        <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-lg sticky top-24">
                            <div className="flex justify-between items-center mb-6 md:hidden">
                                <h3 className="font-serif text-xl">Filters</h3>
                                <button onClick={() => setIsFilterOpen(false)}><X size={20} /></button>
                            </div>

                            {/* Brand Filter */}
                            <div className="mb-8">
                                <h3 className="font-serif text-lg mb-4">Brands</h3>
                                <div className="space-y-2">
                                    {AVAILABLE_BRANDS.map((brand) => (
                                        <label key={brand} className="flex items-center space-x-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
                                            <div className={`w - 5 h - 5 border flex items - center justify - center transition - colors ${selectedBrands.includes(brand) ? 'bg-luxury-black border-luxury-black mb-1' : 'border-gray-300 group-hover:border-luxury-gold'
                                                } `}>
                                                {selectedBrands.includes(brand) && <Check size={12} className="text-white" />}
                                            </div>
                                            <span className="text-gray-600 group-hover:text-luxury-black transition-colors">{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter (Simple Range for now) */}
                            <div>
                                <h3 className="text-luxury-gold font-bold uppercase tracking-widest text-xs mb-4">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>$0</span>
                                        <span>$100k+</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        step="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full accent-luxury-gold h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="text-center text-sm font-bold text-luxury-black">
                                        Up to ${priceRange[1].toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {displayProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                    {displayProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {products.length < totalCount && (
                                    <div className="mt-12 text-center">
                                        <button
                                            onClick={loadMore}
                                            disabled={loading}
                                            className="px-8 py-3 bg-white border border-gray-300 text-luxury-black font-serif uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'Loading...' : 'Load More Timepieces'}
                                        </button>
                                        <p className="mt-4 text-xs text-gray-400">
                                            Showing {products.length} of {totalCount}
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20 text-gray-500">
                                <p className="text-xl font-serif mb-2">No timepieces found.</p>
                                <button
                                    onClick={() => { setSelectedBrands([]); setPriceRange([0, 100000]) }}
                                    className="text-luxury-gold hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Shop;
