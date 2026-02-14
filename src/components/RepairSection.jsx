import { motion } from 'framer-motion';
import { PenTool as Tool, ShieldCheck, Clock, Award } from 'lucide-react';

const RepairSection = () => {
    const services = [
        {
            icon: <Tool className="text-luxury-gold" size={24} />,
            title: "Expert Overhaul",
            description: "Complete disassembly, cleaning, and lubrication of the movement by certified master watchmakers."
        },
        {
            icon: <ShieldCheck className="text-luxury-gold" size={24} />,
            title: "Authentic Parts",
            description: "We use only genuine manufacturer parts to preserve the value and integrity of your timepiece."
        },
        {
            icon: <Clock className="text-luxury-gold" size={24} />,
            title: "Water Resistance",
            description: "Pressure testing and gasket replacement to ensure your watch remains sealed to factory specs."
        },
        {
            icon: <Award className="text-luxury-gold" size={24} />,
            title: "Certified Polishing",
            description: "Professional case and bracelet refinishing to restore that showroom shine without loss of shape."
        }
    ];

    return (
        <section id="repair" className="py-24 bg-white overflow-hidden text-luxury-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Visual Side */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2080&auto=format&fit=crop"
                                alt="Watch Repair"
                                className="w-full h-[400px] md:h-[600px] object-cover shadow-2xl"
                            />
                            <div className="absolute -bottom-8 -right-8 bg-luxury-black text-white p-8 hidden md:block">
                                <p className="text-luxury-gold font-serif text-3xl mb-1">2 Year</p>
                                <p className="uppercase tracking-widest text-xs opacity-70">Service Warranty</p>
                            </div>
                        </motion.div>
                        <div className="absolute top-12 -left-12 w-full h-full border border-luxury-gold/20 -z-0" />
                    </div>

                    {/* Content Side */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block py-1 px-3 border border-luxury-gold text-luxury-gold uppercase tracking-[0.2em] text-xs font-semibold mb-6">
                                Official Service Center
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight text-luxury-black">
                                Certified Restoration & <br />
                                <span className="italic text-luxury-gold">Master Watchmaking</span>
                            </h2>
                            <p className="text-gray-600 text-lg mb-12 leading-relaxed max-w-xl">
                                As certified master watchmakers, we understand the intricate mechanics of your investment. From vintage restoration to modern servicing, your watch is in expert hands.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                {services.map((service, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            {service.icon}
                                            <h3 className="font-serif text-xl">{service.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button className="bg-luxury-black text-white px-10 py-4 hover:bg-luxury-gold transition-colors duration-300 uppercase tracking-widest text-sm font-bold shadow-lg">
                                Schedule a Service
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RepairSection;
