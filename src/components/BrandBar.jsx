import { Link } from 'react-router-dom';

const brands = [
    'Rolex', 'Omega', 'Cartier', 'Patek Philippe', 'Audemars Piguet',
    'Tudor', 'Panerai', 'Longines', 'Oris', 'Breitling', 'Grand Seiko'
];

const BrandBar = () => {
    return (
        <div className="bg-white border-b border-gray-100 py-6 sticky top-0 md:relative z-40">
            <div className="container mx-auto px-6">
                <div className="flex overflow-x-auto space-x-8 md:justify-center pb-2 md:pb-0 scrollbar-hide">
                    {brands.map((brand) => (
                        <Link
                            key={brand}
                            to={`/shop?brand=${brand}`}
                            className="text-gray-500 hover:text-luxury-black font-serif text-sm whitespace-nowrap transition-colors flex items-center space-x-2"
                        >
                            {/* Placeholder for Logo - keeping it text for now as per plan */}
                            <span className="w-2 h-2 rounded-full bg-gray-200"></span>
                            <span>{brand}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandBar;
