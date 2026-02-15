import { motion } from 'framer-motion';

const brands = [
    "ROLEX",
    "PATEK PHILIPPE",
    "AUDEMARS PIGUET",
    "VACHERON CONSTANTIN",
    "CARTIER",
    "OMEGA",
    "TUDOR",
    "IWC SCHAFFHAUSEN",
    "JAEGER-LECOULTRE",
    "PANERAI"
];

const BrandCarousel = () => {
    return (
        <div className="w-full overflow-hidden bg-transparent py-8 border-t border-white/10 mt-12">
            <div className="relative">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-luxury-black to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-luxury-black to-transparent" />

                <div className="flex">
                    <motion.div
                        className="flex whitespace-nowrap gap-16 md:gap-32"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30,
                        }}
                    >
                        {[...brands, ...brands].map((brand, index) => (
                            <span
                                key={index}
                                className="text-xl md:text-2xl font-serif text-white/50 tracking-[0.2em] hover:text-luxury-gold transition-colors duration-300 cursor-default"
                            >
                                {brand}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BrandCarousel;
