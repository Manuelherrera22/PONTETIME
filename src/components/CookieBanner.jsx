import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('pontetime_cookie_consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 2000);
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
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto bg-luxury-white border border-gray-200 shadow-xl rounded-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-luxury-black font-serif text-lg mb-2 tracking-wide">We Value Your Privacy</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-sans">
                                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies. Read our{' '}
                                <Link to="/privacy" className="text-luxury-gold hover:text-luxury-black underline decoration-1 underline-offset-2 transition-colors">
                                    Privacy Policy
                                </Link>.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 min-w-[280px]">
                            <button
                                onClick={handleDecline}
                                className="px-6 py-2.5 rounded-none border border-gray-300 text-gray-700 font-sans font-medium hover:bg-luxury-gray transition-colors uppercase tracking-wider text-xs"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2.5 rounded-none bg-luxury-black text-white font-sans font-medium hover:bg-luxury-gold transition-colors uppercase tracking-wider text-xs shadow-sm"
                            >
                                Accept Cookies
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
