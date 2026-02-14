import { Link } from 'react-router-dom';

const ElegantProductCard = ({ product }) => {
    return (
        <div className="group flex flex-col items-center text-center p-2">
            {/* Image Container - Borderless */}
            <Link to={`/product/${product.id}`} className="block relative w-full aspect-[3/4] overflow-hidden mb-4 bg-transparent">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
            </Link>

            {/* Content - Minimalist Typography */}
            <div className="space-y-1">
                <Link to={`/product/${product.id}`} className="block">
                    <span className="text-gray-400 text-[10px] font-sans uppercase tracking-[0.2em] block mb-1 hover:text-luxury-black transition-colors">
                        {product.brand}
                    </span>
                    <h3 className="text-luxury-black font-serif text-lg leading-tight group-hover:text-gray-600 transition-colors duration-300">
                        {product.name}
                    </h3>
                </Link>

                {/* Optional: Price can be hidden or subtle based on reference image, 
                    but keeping it subtle here as it's an e-commerce site */}
                <p className="text-gray-400 font-light text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {product.price}
                </p>
            </div>
        </div>
    );
};

export default ElegantProductCard;
