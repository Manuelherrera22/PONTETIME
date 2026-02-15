import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const ServiceDetail = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Image Side */}
                    <div className="md:w-1/3 bg-gray-100 min-h-[300px] md:min-h-full relative">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-luxury-black/20" />
                        <div className="absolute bottom-6 left-6 text-white">
                            <h3 className="text-3xl font-serif font-bold">{service.title}</h3>
                            <p className="text-luxury-gold font-bold mt-2">{service.price}</p>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="md:w-2/3 p-8 md:p-12">
                        <h4 className="font-serif text-2xl mb-6 text-luxury-black">Service Details</h4>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {service.detailedDescription}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h5 className="font-bold uppercase tracking-widest text-xs mb-4 text-gray-400">What's Included</h5>
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                            <Check size={16} className="text-luxury-gold mt-0.5 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-bold uppercase tracking-widest text-xs mb-4 text-gray-400">Turnaround Time</h5>
                                <p className="text-luxury-black font-serif text-xl">{service.turnaround || "4-6 Weeks"}</p>
                                <p className="text-xs text-gray-500 mt-2">Expedited service available.</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <a
                                href="#request-quote"
                                onClick={onClose}
                                className="block w-full bg-luxury-black text-white text-center py-4 uppercase tracking-widest font-bold hover:bg-luxury-gold transition-colors"
                            >
                                Book This Service
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ServiceDetail;
