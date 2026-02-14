import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('pontetime_cookie_consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('pontetime_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('pontetime_cookie_consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-lg p-6 md:flex items-center justify-between gap-6">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-luxury-black font-serif text-lg mb-2">We value your privacy</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                By clicking "Accept", you consent to our use of cookies.
                                <a href="/privacy" className="text-luxury-gold hover:underline ml-1">Read our Privacy Policy</a>.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <button
                                onClick={handleDecline}
                                className="text-gray-500 hover:text-luxury-black text-sm font-bold uppercase tracking-wider px-4 py-2"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="bg-luxury-black text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-luxury-gold transition-colors shadow-lg"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
