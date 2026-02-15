import { Link } from 'react-router-dom';

const brands = [
    'Rolex', 'Omega', 'Cartier', 'Patek Philippe', 'Audemars Piguet',
    'Tudor', 'Panerai', 'Longines', 'Oris', 'Breitling', 'Grand Seiko'
];

const BrandBar = () => {
    return (
        <div className="bg-white border-b border-gray-100 py-4 md:py-6 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex overflow-x-auto gap-8 md:gap-12 md:justify-center pb-2 md:pb-0 scrollbar-hide snap-x">
                    {brands.map((brand) => (
                        <Link
                            key={brand}
                            to={`/shop?brand=${brand}`}
                            className="text-gray-400 hover:text-luxury-black text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-colors flex-shrink-0 snap-start"
                        >
                            {brand}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandBar;
