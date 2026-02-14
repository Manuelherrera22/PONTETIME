import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('pontetime_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('pontetime_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            if (prev.find(item => item.id === product.id)) {
                return prev; // Item already in cart
            }
            return [...prev, product];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
