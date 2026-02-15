import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer className="bg-luxury-black text-white pt-24 pb-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="md:col-span-1">
                        <div className="h-16 w-auto mb-8">
                            <Logo color="white" />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-light">
                            The premier destination for buying, selling, and trading certified pre-owned luxury timepieces.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold mb-8">Collections</h4>
                        <ul className="space-y-4">
                            {['New Arrivals', 'Rolex', 'Patek Philippe', 'Omega', 'Audemars Piguet'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-wider">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold mb-8">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Sell Your Watch', 'Authenticity Guarantee', 'Contact', 'Journal'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-wider">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-gold mb-8">Newsletter</h4>
                        <p className="text-gray-400 text-xs mb-6 font-light">
                            Subscribe to receive updates on new arrivals and special offers.
                        </p>
                        <form className="relative border-b border-gray-700 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent border-none text-white w-full focus:outline-none focus:ring-0 placeholder-gray-600 text-sm py-2"
                            />
                            <button className="absolute right-0 bottom-2 text-gray-400 hover:text-white transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </form>
                        <div className="flex space-x-6 mt-10">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-300"><Instagram size={18} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-300"><Facebook size={18} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-300"><Twitter size={18} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} PonteTIME. All rights reserved.</p>
                    <div className="flex space-x-8 mt-6 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
