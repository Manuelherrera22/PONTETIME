
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import { Filter, X, ChevronDown, Check } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
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

    const displayProducts = products;

    if (loading && page === 0) {
        return (
            <section className="min-h-screen bg-white text-luxury-black pt-32 pb-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Skeleton Sidebar */}
                        <aside className="hidden md:block w-56 flex-shrink-0 pt-2">
                            <div className="space-y-8 animate-pulse">
                                <div className="h-4 w-24 bg-gray-100 rounded" />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-4 w-full bg-gray-50 rounded" />)}
                                </div>
                            </div>
                        </aside>

                        {/* Skeleton Grid */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-white text-luxury-black pt-32 md:pt-40 pb-20">
            <SEO
                title="Shop Luxury Watches | Full Collection"
                description="Browse our complete inventory of Rolex, Omega, Patek Philippe, and more. Filter by brand and price to find your perfect timepiece."
            />
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Inventory</h4>
                        <h1 className="text-4xl md:text-5xl font-serif text-luxury-black">The Collection</h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-end md:items-center gap-6 mt-6 md:mt-0">
                        <p className="text-xs text-gray-400 font-medium tracking-wide">
                            {products.length} Timepieces
                        </p>

                        <div className="relative group">
                            <select
                                className="appearance-none bg-transparent border-none text-xs font-bold uppercase tracking-widest text-luxury-black py-2 pr-8 focus:outline-none cursor-pointer"
                                onChange={(e) => setSortBy(e.target.value)}
                                defaultValue={sortBy}
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-luxury-black pointer-events-none" />
                        </div>

                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-luxury-black md:hidden"
                        >
                            <Filter size={14} /> Filter
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 relative">

                    {/* Sidebar Filters */}
                    <aside className={`md:w-56 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
                        <div className="sticky top-32">
                            <div className="flex justify-between items-center mb-8 md:hidden">
                                <h3 className="font-serif text-xl">Filters</h3>
                                <button onClick={() => setIsFilterOpen(false)}><X size={20} /></button>
                            </div>

                            {/* Brand Filter */}
                            <div className="mb-10">
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold mb-6">Brands</h3>
                                <div className="space-y-3">
                                    {AVAILABLE_BRANDS.map((brand) => (
                                        <label key={brand} className="flex items-center space-x-3 cursor-pointer group" onClick={() => toggleBrand(brand)}>
                                            <div className={`w-4 h-4 border flex items-center justify-center transition-all duration-300 ${selectedBrands.includes(brand) ? 'bg-luxury-black border-luxury-black' : 'border-gray-200 group-hover:border-gray-400'
                                                }`}>
                                                {selectedBrands.includes(brand) && <Check size={10} className="text-white" />}
                                            </div>
                                            <span className={`text-xs uppercase tracking-wider transition-colors ${selectedBrands.includes(brand) ? 'text-luxury-black font-bold' : 'text-gray-500 group-hover:text-luxury-black'}`}>
                                                {brand}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold mb-6">Price Range</h3>
                                <div className="space-y-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100000"
                                        step="1000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full h-0.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-luxury-black"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                                        <span>$0</span>
                                        <span className="text-luxury-black font-bold max-w-[80px] text-right truncate">
                                            ${priceRange[1].toLocaleString()}{priceRange[1] === 100000 ? '+' : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {displayProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                                    {displayProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {products.length < totalCount && (
                                    <div className="mt-20 text-center">
                                        <button
                                            onClick={loadMore}
                                            disabled={loading}
                                            className="px-10 py-4 bg-transparent border border-gray-200 text-luxury-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-black hover:text-white hover:border-luxury-black transition-all duration-500 disabled:opacity-50"
                                        >
                                            {loading ? 'Loading...' : 'View More'}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center">
                                <p className="text-2xl font-serif text-luxury-black mb-4">No timepieces found</p>
                                <p className="text-gray-400 text-sm mb-8">Try adjusting your filters or search criteria.</p>
                                <button
                                    onClick={() => { setSelectedBrands([]); setPriceRange([0, 100000]) }}
                                    className="text-luxury-gold text-xs font-bold uppercase tracking-widest hover:text-black transition-colors border-b border-luxury-gold pb-1 hover:border-black"
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
