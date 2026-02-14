import { Link } from 'react-router-dom';

const SellSection = () => {
    return (
        <section className="bg-black text-white py-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left: Lifestyle Image Placeholder */}
                <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden md:order-1">
                    <img
                        src="https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1000&auto=format&fit=crop"
                        alt="Luxury Watch Lifestyle"
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Right: Content & Form */}
                <div className="md:order-2">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">Sell Your Watch</h2>
                    <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
                        If you are looking for the best place to sell your watch or how to find the value or worth of your used luxury timepiece, turn to the experts here for a free no obligation evaluation.
                    </p>

                    <form className="space-y-4 max-w-md">
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-white text-black px-4 py-3 rounded-none focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                            />
                        </div>
                        <div>
                            <select
                                className="w-full bg-white text-black px-4 py-3 rounded-none focus:outline-none focus:ring-2 focus:ring-luxury-gold appearance-none"
                                defaultValue=""
                            >
                                <option value="" disabled>Select Brand</option>
                                <option value="Rolex">Rolex</option>
                                <option value="Patek Philippe">Patek Philippe</option>
                                <option value="Audemars Piguet">Audemars Piguet</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            className="w-full border border-white text-white py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 rounded-full mt-4"
                        >
                            Get Your Value
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SellSection;
