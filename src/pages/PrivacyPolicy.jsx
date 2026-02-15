import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO
                title="Privacy Policy | PonteTIME"
                description="Learn about how PonteTIME collects, uses, and protects your personal information."
            />

            <div className="pt-24 pb-16 bg-luxury-white min-h-screen">
                <div className="max-w-4xl mx-auto px-6 md:px-12">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif text-luxury-black mb-4">Privacy Policy</h1>
                        <div className="h-1 w-24 bg-luxury-gold mx-auto mb-6"></div>
                        <p className="text-gray-600 font-sans max-w-2xl mx-auto">
                            Your trust is paramount. We are committed to protecting your personal information and ensuring transparency in how we handle your data.
                        </p>
                        <p className="text-sm text-gray-400 mt-4 uppercase tracking-widest">Last Updated: {new Date().toLocaleDateString()}</p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="prose prose-lg max-w-none text-gray-700 font-sans"
                    >
                        <section className="mb-12">
                            <h2 className="text-2xl font-serif text-luxury-black mb-4 border-b border-gray-100 pb-2">1. Information We Collect</h2>
                            <p className="mb-4">
                                We collect information you provide directly to us, such as when you create an account, make a purchase, sign up for our newsletter, or contact us for support. This may include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-luxury-gold">
                                <li><strong className="text-luxury-black">Identity Data:</strong> Name, username, or similar identifiers.</li>
                                <li><strong className="text-luxury-black">Contact Data:</strong> Email address, phone number, billing address, and shipping address.</li>
                                <li><strong className="text-luxury-black">Transaction Data:</strong> Details about payments and products you have purchased.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif text-luxury-black mb-4 border-b border-gray-100 pb-2">2. How We Use Your Information</h2>
                            <p className="mb-4">
                                We strictly use your personal data to provide and improve our services. Key uses include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-luxury-gold">
                                <li>Processing your orders and managing your account.</li>
                                <li>Sending transaction-related emails (order confirmations, shipping updates).</li>
                                <li>Personalizing your website experience and delivering relevant content.</li>
                                <li>Preventing fraud and ensuring the security of our platform.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif text-luxury-black mb-4 border-b border-gray-100 pb-2">3. Cookies and Tracking</h2>
                            <p className="mb-4">
                                We use cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences, understand how you use our site, and improve our marketing efforts. You can choose to disable cookies through your browser settings, though this may affect site functionality.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif text-luxury-black mb-4 border-b border-gray-100 pb-2">4. Data Sharing & Security</h2>
                            <p className="mb-4">
                                We <strong className="text-luxury-black">never sell your data</strong>. We may share information with trusted third-party service providers (e.g., payment processors like Stripe, shipping carriers) solely for the purpose of fulfilling our services. We implement industry-standard security measures to protect your data from unauthorized access.
                            </p>
                        </section>

                        <section className="mb-12 bg-gray-50 p-8 rounded-sm border border-gray-100">
                            <h2 className="text-2xl font-serif text-luxury-black mb-4">5. Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions, concerns, or requests regarding your personal data, please reach out to our dedicated privacy team:
                            </p>
                            <div className="font-medium text-luxury-black font-serif">
                                <p>Email: <a href="mailto:privacy@pontetime.com" className="text-luxury-gold hover:underline">privacy@pontetime.com</a></p>
                                <p>Address: Paseo de la Reforma, Mexico City</p>
                            </div>
                        </section>

                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;
