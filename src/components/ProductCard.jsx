import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    // Coming Soon / Próximamente Mode
    // Locked interaction, blurred image, hidden price.

    return (
        <div className="group block h-full select-none cursor-default">
            <div
                className="bg-white border border-gray-100 rounded-sm overflow-hidden h-full flex flex-col relative shadow-sm"
            >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover filter blur-[4px] opacity-80"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100/50">
                        </div>
                    )}

                    {/* Coming Soon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 shadow-sm border border-gray-100">
                            <span className="text-luxury-black text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                                Próximamente
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6 flex-grow flex flex-col justify-between relative bg-white">
                    <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{product.brand}</p>
                        <h3 className="font-serif text-base md:text-lg text-gray-400 mb-2 leading-tight blur-[1px] select-none">{product.name}</h3>
                    </div>

                    <div className="mt-auto pt-4 border-t border-dashed border-gray-100">
                        <span className="text-xs text-luxury-gold uppercase tracking-widest font-bold">
                            Disponible Pronto
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
