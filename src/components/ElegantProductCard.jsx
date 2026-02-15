const ElegantProductCard = ({ product }) => {
    return (
        <div className="group flex flex-col items-center text-center p-2 select-none cursor-default">
            {/* Image Container - Próximamente Mode */}
            <div className="block relative w-full aspect-[3/4] overflow-hidden mb-4 bg-transparent">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain filter blur-[5px] opacity-70"
                />
                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 px-3 py-1.5 backdrop-blur-none border border-gray-100 shadow-sm">
                        <span className="text-luxury-black text-[9px] font-bold uppercase tracking-[0.2em]">
                            Próximamente
                        </span>
                    </div>
                </div>
            </div>

            {/* Content - Minimalist & Obscured */}
            <div className="space-y-1 opacity-60">
                <span className="text-gray-400 text-[10px] font-sans uppercase tracking-[0.2em] block mb-1">
                    {product.brand}
                </span>
                <h3 className="text-gray-400 font-serif text-lg leading-tight blur-[2px]">
                    xxxxxxxx
                </h3>
            </div>
        </div>
    );
};

export default ElegantProductCard;
