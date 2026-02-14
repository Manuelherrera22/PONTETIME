import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-luxury-gray border-t border-gray-200 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="mb-8 md:mb-0">
                        <div className="h-20 w-64 mb-6">
                            <Logo color="#111827" />
                        </div>
                        <p className="text-gray-400 max-w-xs leading-relaxed">
                            The premier destination for buying, selling, and trading certified pre-owned luxury timepieces.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-sm mb-6">Shop</h4>
                        <ul className="space-y-4">
                            {['New Arrivals', 'Rolex', 'Patek Philippe', 'Omega', 'Audemars Piguet'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-600 hover:text-luxury-gold transition-colors text-sm">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-sm mb-6">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Sell Your Watch', 'Authenticity Guarantee', 'Contact', 'Blog'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-600 hover:text-luxury-gold transition-colors text-sm">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-luxury-gold font-bold uppercase tracking-widest text-sm mb-6">Stay Updated</h4>
                        <p className="text-gray-600 text-sm mb-4">
                            Subscribe to receive updates on new arrivals and special offers.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white border border-gray-300 text-luxury-black px-4 py-2 w-full focus:outline-none focus:border-luxury-gold text-sm"
                            />
                            <button className="bg-luxury-gold text-white px-4 py-2 font-bold hover:bg-black transition-colors">
                                &rarr;
                            </button>
                        </form>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} PonteTIME. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-luxury-black">Privacy Policy</Link>
                        <a href="#" className="hover:text-luxury-black">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
