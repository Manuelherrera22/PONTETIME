import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/images/hero_patek_studio.png")' }} // Patek Philippe Nautilus (Studio Shot)
            >
                <div className="absolute inset-0 bg-white/20" /> {/* Subtle overlay for text readability */}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-luxury-gold uppercase tracking-[0.2em] mb-4 text-sm md:text-base font-semibold"
                >
                    Exquisite Timepieces
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif text-luxury-black font-bold mb-6 leading-tight"
                >
                    Timeless <span className="italic text-luxury-gold">Elegance</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-gray-600 max-w-lg mx-auto text-lg mb-10 font-light"
                >
                    Discover our curated collection of certified pre-owned luxury watches.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button className="bg-luxury-black text-white px-8 py-3 font-semibold hover:bg-luxury-gold transition-colors duration-300 uppercase tracking-wider shadow-lg">
                        Shop Collection
                    </button>
                    <button className="border border-luxury-black text-luxury-black px-8 py-3 font-semibold hover:bg-luxury-black hover:text-white transition-colors duration-300 uppercase tracking-wider">
                        Sell Your Watch
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
