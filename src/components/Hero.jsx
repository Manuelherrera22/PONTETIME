import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/images/hero_patek_studio.png")' }} // Patek Philippe Nautilus (Studio Shot)
            >
                <div className="absolute inset-0 bg-black/30" /> {/* Slightly Darker overlay for text contrast */}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white/80 uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 text-[10px] md:text-sm font-bold"
                >
                    Exquisite Timepieces
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-7xl lg:text-8xl font-serif text-white font-medium mb-6 md:mb-8 leading-tight tracking-tight"
                >
                    Timeless <span className="italic font-light block md:inline">Elegance</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-200 max-w-lg mx-auto text-sm md:text-xl mb-8 md:mb-12 font-light leading-relaxed px-4 md:px-0"
                >
                    Discover our selected collection of certified pre-owned luxury watches.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-6 md:px-0 w-full md:w-auto"
                >
                    <button className="bg-white text-luxury-black px-6 py-3 md:px-10 md:py-4 font-bold hover:bg-luxury-gold hover:text-white transition-all duration-300 uppercase tracking-[0.15em] text-[10px] md:text-xs w-full md:w-auto">
                        Shop Collection
                    </button>
                    <button className="border border-white text-white px-6 py-3 md:px-10 md:py-4 font-bold hover:bg-white hover:text-luxury-black transition-all duration-300 uppercase tracking-[0.15em] text-[10px] md:text-xs w-full md:w-auto">
                        Sell Your Watch
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
