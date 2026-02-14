import { motion } from 'framer-motion';
import { Check, Clock, Shield, PenTool, Search, FileText, Wrench, BadgeCheck } from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

const ServicesPage = () => {
    const services = [
        {
            title: "Authorized Service",
            price: "From $850",
            features: ["Complete disassembly", "Movement overhaul", "Ultrasonic cleaning", "Lubrication & regulation", "2-year warranty"]
        },
        {
            title: "Expert Polishing",
            price: "From $250",
            features: ["Case refinishing", "Bracelet restoration", "Laser welding (deep scratches)", "Grain re-application", "High-gloss polishing"]
        },
        {
            title: "Battery & Seal",
            price: "From $120",
            features: ["Battery replacement", "Gasket inspection", "Water resistance test", "Pressure proofing", "Ultrasonic cleaning (bracelet)"]
        }
    ];

    const processSteps = [
        { icon: <Search size={32} />, title: "Diagnosis", desc: "Detailed inspection of movement and case condition." },
        { icon: <FileText size={32} />, title: "Quote", desc: "Transparent cost estimation and timeline approval." },
        { icon: <Wrench size={32} />, title: "Restoration", desc: "Expert execution by certified master watchmakers." },
        { icon: <BadgeCheck size={32} />, title: "Quality Control", desc: "Rigorous testing for accuracy and water resistance." }
    ];

    return (
        <main className="pt-32 md:pt-40">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-luxury-black text-white flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=2070&auto=format&fit=crop")' }} // Watchmaker workspace
                />
                <div className="relative z-10 text-center px-4">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-luxury-gold uppercase tracking-[0.3em] font-semibold text-sm block mb-4"
                    >
                        Certified Restoration
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-6"
                    >
                        Master Watchmaking
                    </motion.h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light">
                        Preserving the legacy of your timepiece with uncompromising attention to detail and factory-certified expertise.
                    </p>
                </div>
            </section>

            {/* Before & After Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-luxury-black mb-4">Our Results</h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            See the transformative power of our expert restoration. Slide to compare the condition before and after our service.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Example 1: Rolex Batman */}
                        <div>
                            <div className="bg-[#f4f4f4] p-4 rounded-sm">
                                <BeforeAfterSlider
                                    beforeImage="/images/batman-before.png" // User provided image (broken crystal)
                                    afterImage="/images/batman-after.png" // User provided image (clean)
                                />
                            </div>
                            <h3 className="text-xl font-serif mt-6 mb-2">Rolex GMT-Master II "Batman"</h3>
                            <p className="text-sm text-gray-500">Complete mechanical overhaul, laser welding of case flakes, and factory-grade polishing.</p>
                        </div>
                        {/* Example 2: Rolex Daytona */}
                        <div>
                            <div className="bg-[#f4f4f4] p-4 rounded-sm">
                                <BeforeAfterSlider
                                    beforeImage="/images/daytona-before.png" // User provided image (broken crystal)
                                    afterImage="/images/daytona-after.png" // User provided image (clean)
                                />
                            </div>
                            <h3 className="text-xl font-serif mt-6 mb-2">Rolex Daytona Rose Gold</h3>
                            <p className="text-sm text-gray-500">Movement regulation service, bracelet tightening, and full case restoration.</p>
                        </div>
                        {/* Example 3: Cartier Panthere */}
                        <div>
                            <div className="bg-[#f4f4f4] p-4 rounded-sm">
                                <BeforeAfterSlider
                                    beforeImage="/images/cartier-before.png"
                                    afterImage="/images/cartier-after.png"
                                />
                            </div>
                            <h3 className="text-xl font-serif mt-6 mb-2">Cartier Panthere Yellow Gold</h3>
                            <p className="text-sm text-gray-500">Complete gold restoration, removal of deep scratches, and bracelet re-pinning.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Menu */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-10 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                                <h3 className="text-2xl font-serif text-luxury-black mb-2">{service.title}</h3>
                                <p className="text-luxury-gold font-bold text-xl mb-6">{service.price}</p>
                                <ul className="space-y-4">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <Check size={16} className="text-luxury-gold mt-1 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-8 bg-luxury-black text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-luxury-gold transition-colors">
                                    Book Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-serif text-center mb-16">The Restoration Process</h2>
                    <div className="flex flex-col md:flex-row justify-between items-center relative gap-8">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-0" />

                        {processSteps.map((step, index) => (
                            <div key={index} className="relative z-10 flex flex-col items-center text-center max-w-[250px]">
                                <div className="w-24 h-24 bg-white border-2 border-luxury-gold rounded-full flex items-center justify-center text-luxury-gold mb-6 shadow-lg">
                                    {step.icon}
                                </div>
                                <h3 className="font-serif text-xl mb-3">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Request Form */}
            <section className="py-24 bg-luxury-black text-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-serif mb-4">Request a Quote</h2>
                        <p className="text-gray-400">Describe your timepiece and issue. We will respond within 24 hours.</p>
                    </div>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-luxury-gold">Brand</label>
                            <input type="text" className="w-full bg-white/10 border border-white/20 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors" placeholder="e.g. Rolex" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-luxury-gold">Model / Reference</label>
                            <input type="text" className="w-full bg-white/10 border border-white/20 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors" placeholder="e.g. Submariner 16610" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase tracking-widest text-luxury-gold">Issue Description</label>
                            <textarea rows="4" className="w-full bg-white/10 border border-white/20 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors" placeholder="Please describe the service needed..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-luxury-gold">Name</label>
                            <input type="text" className="w-full bg-white/10 border border-white/20 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors" placeholder="Your Name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-luxury-gold">Email</label>
                            <input type="email" className="w-full bg-white/10 border border-white/20 p-4 text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold transition-colors" placeholder="your@email.com" />
                        </div>
                        <button className="md:col-span-2 bg-luxury-gold text-luxury-black py-4 uppercase tracking-widest font-bold hover:bg-white transition-colors mt-4">
                            Submit Request
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default ServicesPage;
