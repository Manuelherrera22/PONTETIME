import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useAuth();
    const { cart } = useCart();
    const location = useLocation();

    // Check if we are on the home page
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine header style: transparent only on Home when not scrolled
    const useTransparentHeader = isHomePage && !isScrolled;

    const headerClasses = useTransparentHeader
        ? 'bg-transparent py-6'
        : 'bg-white/90 backdrop-blur-md py-4 shadow-sm';

    const textClasses = useTransparentHeader
        ? 'text-white' // Adapted for Dark Hero on Services Page
        : 'text-luxury-black';

    const linkClasses = useTransparentHeader
        ? 'text-gray-200 hover:text-luxury-gold' // Light text for dark background
        : 'text-gray-600 hover:text-luxury-black';

    const navLinks = [
        { name: 'Watches', href: '/shop' },
        { name: 'Services', href: '/services' },
        { name: 'Sell', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    return (
        <>
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${headerClasses}`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="relative z-10 flex items-center">
                        <div className="h-12 md:h-20 w-auto min-w-[120px] md:min-w-[200px] transition-all duration-300">
                            <Logo color={useTransparentHeader ? 'white' : 'black'} />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-sm font-sans transition-colors uppercase tracking-widest ${linkClasses}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {/* 
                        <button className={`${textClasses} hover:text-luxury-gold transition-colors`}>
                            <Search size={20} />
                        </button>
                        */}

                        <Link
                            to="/repair-request"
                            className="bg-luxury-gold text-white px-6 py-2 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-luxury-black transition-colors"
                        >
                            Start Repair
                        </Link>

                        {/* Admin Access Only - Hidden for regular users in this mode */}
                        <Link to={user ? "/admin" : "/login"} className={`${textClasses} hover:text-luxury-gold transition-colors opacity-50 hover:opacity-100`}>
                            <User size={20} />
                        </Link>

                        {/* 
                        {user && (
                            <Link to="/wishlist" className={`${textClasses} hover:text-luxury-gold transition-colors`}>
                                <Heart size={20} />
                            </Link>
                        )}

                        <Link to="/cart" className={`${textClasses} hover:text-luxury-gold transition-colors relative`}>
                            <ShoppingBag size={20} />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-luxury-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </Link> 
                        */}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`${textClasses} focus:outline-none`}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>


                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg md:hidden h-screen bg-opacity-95 backdrop-blur-sm"
                        >
                            <div className="flex flex-col p-6 space-y-6 h-full">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="text-2xl font-serif text-luxury-black hover:text-luxury-gold border-b border-gray-100 pb-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="flex flex-col gap-4 mt-4">
                                    <Link
                                        to={user ? "/admin" : "/login"}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center space-x-3 text-lg text-gray-600 hover:text-luxury-gold"
                                    >
                                        <User size={24} />
                                        <span>{user ? "My Account" : "Login / Register"}</span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Floating Cart Button (Mobile Only) - Hidden for Service Mode 
            <AnimatePresence>
                {cart.length > 0 && !isMobileMenuOpen && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="fixed bottom-6 right-6 z-50 md:hidden"
                    >
                        <Link
                            to="/cart"
                            className="bg-luxury-gold text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative hover:bg-black transition-colors"
                        >
                            <ShoppingBag size={24} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                                {cart.length}
                            </span>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
            */}
        </>
    );
};

export default Header;
