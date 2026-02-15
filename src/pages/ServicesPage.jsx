import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Shield, PenTool, Search, FileText, Wrench, BadgeCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ServiceDetail from '../components/ServiceDetail';
import BrandCarousel from '../components/BrandCarousel';
import SEO from '../components/SEO';

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [openFaq, setOpenFaq] = useState(0);
    const services = [
        {
            title: "Authorized Service (Overhaul)",
            price: "From $850",
            turnaround: "4-6 Weeks",
            image: "https://images.unsplash.com/photo-1619163615560-6b64d1f57b68?q=80&w=2070&auto=format&fit=crop", // Macro shot of movement
            features: ["Complete disassembly", "Movement overhaul", "Ultrasonic cleaning", "Lubrication & regulation", "2-year warranty"],
            detailedDescription: "Our comprehensive overhaul restores your timepiece to functional perfection. Every single component of the movement is disassembled, inspected, and ultrasonically cleaned. Worn parts are replaced with genuine Swiss components. The movement is then reassembled, lubricated with specific Moebius oils, and regulated to COSC standards."
        },
        {
            title: "Expert Polishing & Refinishing",
            price: "From $250",
            turnaround: "1-2 Weeks",
            image: "https://images.unsplash.com/photo-1547996663-0b555e571809?q=80&w=2076&auto=format&fit=crop", // Polishing wheel/watch case
            features: ["Case refinishing", "Bracelet restoration", "Laser welding (deep scratches)", "Grain re-application", "High-gloss polishing"],
            detailedDescription: "We don't just 'buff' your watch; we restore its original factory finish. Using advanced lapping machines and laser welding technology, we can fill deep dents and reconstruct sharp case lines (chamfers) that others polish away. We respect the vintage 'skin' of older pieces while making modern watches look brand new."
        },
        {
            title: "Battery, Seal & Pressure Test",
            price: "From $120",
            turnaround: "Same Day / 24hrs",
            image: "https://images.unsplash.com/photo-1585250325438-2396e6241b71?q=80&w=2070&auto=format&fit=crop", // Diver watch in water/testing
            features: ["Battery replacement", "Gasket inspection", "Water resistance test", "Pressure proofing", "Ultrasonic cleaning (bracelet)"],
            detailedDescription: "A dead battery can leak and destroy a movement. Our service includes more than just a swap: we inspect the movement's consumption, replace all rubber gaskets, and perform both dry (vacuum) and wet pressure testing to guarantee waterproof integrity up to the manufacturer's depth rating."
        }
    ];

    const faqs = [
        { q: "How do I ship my watch safely?", a: "We provide a fully insured, prepaid shipping kit with protective packaging. Once you request a quote, we send this kit to your doorstep." },
        { q: "Do you use original parts?", a: "Yes. We are an Authorized Service Partner for major brands, meaning we have direct access to genuine case, movement, and bracelet components." },
        { q: "What is your warranty?", a: "We offer a comprehensive 24-month warranty on all movement overhauls, covering both parts and labor for the work performed." },
        { q: "Can you fix vintage watches?", a: "Absolutely. Our master watchmakers specialize in vintage restoration, including sourcing rare parts and fabricating obsolete components when necessary." }
    ];

    const processSteps = [
        { icon: <Search size={32} />, title: "Diagnosis", desc: "Detailed inspection of movement and case condition." },
        { icon: <FileText size={32} />, title: "Quote", desc: "Transparent cost estimation and timeline approval." },
        { icon: <Wrench size={32} />, title: "Restoration", desc: "Expert execution by certified master watchmakers." },
        { icon: <BadgeCheck size={32} />, title: "Quality Control", desc: "Rigorous testing for accuracy and water resistance." }
    ];

    return (
        <main>
            <SEO
                title="PonteTIME | Luxury Watch Repair & Certified Service Center"
                description="Expert restoration for Rolex, Patek Philippe, and Cartier. Certified overhauls, laser welding, and factory-standard polishing in Mexico City."
                keywords="watch repair, rolex service, luxury watch restoration, watch polishing, watch overhaul, certified watchmaker, patek philippe service, cartier repair"
            />
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative min-h-[60vh] md:h-[60vh] bg-luxury-black text-white flex items-center justify-center overflow-hidden py-20 md:py-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=2070&auto=format&fit=crop")' }} // Watchmaker workspace
                />
                <div className="absolute inset-0 bg-black/40 z-0" /> {/* Added overlay for better text contrast */}

                <div className="relative z-10 text-center px-6 w-full max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 flex justify-center items-center space-x-4"
                    >
                        <span className="bg-luxury-gold text-luxury-black px-4 py-1.5 uppercase tracking-widest text-[10px] md:text-xs font-bold shadow-sm">Authorized Service Partner</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-md leading-tight"
                    >
                        Master Watchmaking
                    </motion.h1>
                    <p className="text-gray-100 max-w-2xl mx-auto text-sm md:text-lg font-light mb-10 drop-shadow-sm leading-relaxed px-2">
                        Your timepiece deserves factory-certified care. We are an authorized service center for the world's most prestigious watch brands.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <Link
                            to="/repair-request"
                            className="inline-block bg-luxury-gold text-white px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-luxury-black transition-colors shadow-lg w-full md:w-auto"
                        >
                            Start Repair Request
                        </Link>
                    </motion.div>


                    <div className="w-full overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
                        <BrandCarousel />
                    </div>

                </div>
            </section>

            {/* Before & After Section */}
            <section className="py-32 bg-white">
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
            <section className="py-32 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-10 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
                                <h3 className="text-2xl font-serif text-luxury-black mb-2">{service.title}</h3>
                                <p className="text-luxury-gold font-bold text-xl mb-6">{service.price}</p>
                                <ul className="space-y-4 mb-8 flex-grow">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <Check size={16} className="text-luxury-gold mt-1 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => setSelectedService(service)}
                                    className="w-full bg-luxury-black text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-luxury-gold transition-colors"
                                >
                                    View Full Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <ServiceDetail service={selectedService} onClose={() => setSelectedService(null)} />
                )}
            </AnimatePresence>

            {/* Warranty & Trust Section */}
            <section className="py-24 bg-luxury-black text-white">
                <div className="container mx-auto px-6 text-center">
                    <Shield size={64} className="text-luxury-gold mx-auto mb-8" />
                    <h2 className="text-4xl font-serif mb-6">24-Month International Warranty</h2>
                    <p className="max-w-2xl mx-auto text-gray-300 text-lg leading-relaxed mb-12">
                        We stand behind our craftsmanship. Every complete overhaul is backed by our comprehensive 2-year warranty, covering all parts and labor. Your peace of mind is part of the service.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
                        <div className="p-6 border border-gray-800 bg-gray-900/50">
                            <h4 className="text-luxury-gold font-bold mb-2">Insured Shipping</h4>
                            <p className="text-sm text-gray-400">Fully insured door-to-door collection and delivery included with every service.</p>
                        </div>
                        <div className="p-6 border border-gray-800 bg-gray-900/50">
                            <h4 className="text-luxury-gold font-bold mb-2">Genuine Parts</h4>
                            <p className="text-sm text-gray-400">Direct access to manufacturer components ensures zero compromise on integrity.</p>
                        </div>
                        <div className="p-6 border border-gray-800 bg-gray-900/50">
                            <h4 className="text-luxury-gold font-bold mb-2">Certified Testing</h4>
                            <p className="text-sm text-gray-400">Rigorous waterproof and chronometric testing to Swiss tolerances.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-4xl font-serif text-center mb-16 text-luxury-black">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-100 pb-4">
                                <button
                                    className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                                >
                                    <span className="font-serif text-lg text-luxury-black">{faq.q}</span>
                                    {openFaq === index ? <ChevronUp className="text-luxury-gold" /> : <ChevronDown className="text-gray-400" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-gray-600 pb-4 leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-serif text-center mb-16">Factory-Standard Protocol</h2>
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
                    <div className="md:col-span-2 mt-4 text-center">
                        <Link
                            to="/repair-request"
                            className="inline-block bg-luxury-gold text-white px-12 py-4 uppercase tracking-widest font-bold hover:bg-white hover:text-luxury-black transition-colors"
                        >
                            Start Repair Request
                        </Link>
                        <p className="text-sm text-gray-500 mt-4">This will start the process to receive your insured shipping kit.</p>
                    </div>
                </div>

            </section>
        </main >
    );
};

export default ServicesPage;
