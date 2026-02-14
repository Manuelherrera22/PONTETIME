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
        ? 'text-luxury-black' // changed from text-white to be visible on light hero
        : 'text-luxury-black';

    const linkClasses = useTransparentHeader
        ? 'text-gray-700 hover:text-luxury-gold' // Darker text for visibility
        : 'text-gray-600 hover:text-luxury-black';

    const navLinks = [
        { name: 'Watches', href: '/shop' },
        { name: 'Services', href: '/services' },
        { name: 'Sell', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    return (
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

                {/* Icons */}
                <div className="hidden md:flex items-center space-x-6">
                    <button className={`${useTransparentHeader ? 'text-gray-700' : 'text-gray-600'} hover:text-luxury-gold transition-colors`}>
                        <Search size={20} />
                    </button>

                    <Link to={user ? "/admin" : "/login"} className={`${useTransparentHeader ? 'text-gray-700' : 'text-gray-600'} hover:text-luxury-gold transition-colors`}>
                        <User size={20} />
                    </Link>

                    {user && (
                        <Link to="/wishlist" className={`${useTransparentHeader ? 'text-gray-700' : 'text-gray-600'} hover:text-luxury-gold transition-colors`}>
                            <Heart size={20} />
                        </Link>
                    )}

                    <Link to="/cart" className={`${useTransparentHeader ? 'text-gray-700' : 'text-gray-600'} hover:text-luxury-gold transition-colors relative`}>
                        <ShoppingBag size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-luxury-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </Link>
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
                        className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg md:hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-lg font-serif text-gray-800 hover:text-luxury-gold"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                                <button className="flex items-center space-x-2 text-gray-500 hover:text-luxury-gold">
                                    <Search size={20} />
                                    <span>Search</span>
                                </button>
                                <button className="flex items-center space-x-2 text-gray-500 hover:text-luxury-gold">
                                    <ShoppingBag size={20} />
                                    <span>Cart ({cart.length})</span>
                                </button>
                                <Link
                                    to={user ? "/admin" : "/login"}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-2 text-gray-500 hover:text-luxury-gold"
                                >
                                    <User size={20} />
                                    <span>{user ? "Account" : "Login"}</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Header;
