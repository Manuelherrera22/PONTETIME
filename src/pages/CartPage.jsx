import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, MessageCircle, ArrowRight, Loader2, Lock } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../lib/stripe';
import CheckoutForm from '../components/CheckoutForm';
import { createPaymentIntent } from '../lib/payment';

const CartPage = () => {
    const { cart, removeFromCart } = useCart();

    const totalPrice = cart.reduce((total, item) => {
        let price = 0;
        if (typeof item.price === 'string') {
            const priceStr = item.price.replace(/[^0-9.]/g, '');
            price = parseFloat(priceStr);
        } else if (typeof item.price === 'number') {
            price = item.price;
        }
        return isNaN(price) ? total : total + price;
    }, 0);

    const [showCheckout, setShowCheckout] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        zip: ''
    });

    const [searchParams] = useSearchParams();
    const [clientSecret, setClientSecret] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get("success") === "true") {
            setIsSuccess(true);
        }
    }, [searchParams]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProceedToPayment = async (e) => {
        e.preventDefault();
        setPaymentLoading(true);
        setPaymentError(null);

        try {
            const shipping = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                zip: formData.zip
            };

            const data = await createPaymentIntent(cart, totalPrice, shipping);

            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            } else {
                throw new Error("Failed to initialize secure payment.");
            }
        } catch (error) {
            console.error("Payment error:", error);
            setPaymentError(error.message || "Failed to connect to secure payment server.");
            // Fallback: The user could still use WhatsApp if Stripe fails
        } finally {
            setPaymentLoading(false);
        }
    };

    const handleWhatsAppFallback = () => {
        // Construct detailed message with shipping info
        let message = "ORDER INQUIRY (PAYMENT PENDING)\n\n";
        message += "I would like to purchase the following timepieces:\n\n";

        cart.forEach(item => {
            message += `- ${item.brand} ${item.name} (Ref: ${item.description || 'N/A'})\n`;
            message += `  Price: ${typeof item.price === 'number' ? '$' + item.price.toLocaleString() : item.price}\n\n`;
        });

        message += `TOTAL VALUE: $${totalPrice.toLocaleString()}\n\n`;
        message += "--------------------------------\n";
        message += "SHIPPING DETAILS:\n";
        message += `Name: ${formData.firstName} ${formData.lastName}\n`;
        message += `Email: ${formData.email}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Address: ${formData.address}, ${formData.city}, ${formData.zip}\n`;
        message += `Country: ${formData.country}\n`;
        message += "--------------------------------\n";
        message += "Please confirm availability and payment instructions.";

        const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (showCheckout) {
        return (
            <div className="min-h-screen bg-white pt-32 md:pt-40 pb-20 px-6">
                <SEO title="Checkout | PonteTIME" />
                <div className="container mx-auto max-w-4xl">
                    <button
                        onClick={() => setShowCheckout(false)}
                        className="flex items-center text-gray-500 hover:text-luxury-black mb-8 transition-colors"
                    >
                        <ArrowRight className="rotate-180 mr-2" size={20} /> Back to Bag
                    </button>

                    {isSuccess ? (
                        <div className="container mx-auto max-w-4xl py-24 text-center">
                            <CheckCircle2 className="mx-auto text-green-500 w-20 h-20 mb-8" />
                            <h2 className="text-4xl font-serif text-luxury-black mb-4 uppercase">Payment Received</h2>
                            <p className="text-xl text-gray-600 mb-12">Your order has been successfully placed. Check your email for confirmation.</p>
                            <Link to="/shop" className="bg-luxury-black text-white px-12 py-4 uppercase tracking-[0.2em] font-bold hover:bg-luxury-gold transition-all">
                                Continue Exploring
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Checkout Form */}
                            <div>
                                <h2 className="text-3xl font-serif text-luxury-black mb-8">Shipping Details</h2>
                                {paymentError && (
                                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm mb-6">
                                        {paymentError}
                                    </div>
                                )}

                                <form onSubmit={handleProceedToPayment} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                                            <input
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold bg-transparent"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                                            <input
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold bg-transparent"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold bg-transparent"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold bg-transparent"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Shipping Address</label>
                                        <input
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold bg-transparent"
                                            placeholder="123 Luxury Lane"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">City</label>
                                            <input
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold bg-transparent"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Postal Code</label>
                                            <input
                                                name="zip"
                                                required
                                                value={formData.zip}
                                                onChange={handleInputChange}
                                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold bg-transparent"
                                                placeholder="10001"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Country</label>
                                        <input
                                            name="country"
                                            required
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-luxury-gold bg-transparent"
                                            placeholder="United States"
                                        />
                                    </div>

                                    {clientSecret ? (
                                        <div className="mt-12 pt-12 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
                                                <CheckoutForm totalPrice={totalPrice} formData={formData} cart={cart} />
                                            </Elements>
                                        </div>
                                    ) : (
                                        <div className="space-y-4 pt-8">
                                            <button
                                                type="submit"
                                                disabled={paymentLoading}
                                                className="w-full bg-luxury-black text-white py-4 font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors flex items-center justify-center shadow-lg"
                                            >
                                                {paymentLoading ? <Loader2 className="animate-spin mr-2" /> : <Lock size={18} className="mr-2" />}
                                                Secure Payment via Stripe
                                            </button>

                                            <div className="relative py-4">
                                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                                                <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-gray-400 font-bold">OR</span></div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleWhatsAppFallback}
                                                className="w-full border border-luxury-black text-luxury-black py-4 font-bold uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-all flex items-center justify-center rounded-sm"
                                            >
                                                <MessageCircle size={18} className="mr-2" /> Order via WhatsApp
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>

                            {/* Mini Order Summary */}
                            <div className="bg-gray-50 p-8 rounded-lg h-fit sticky top-32">
                                <h3 className="text-xl font-serif text-luxury-black mb-6">Your Order</h3>
                                <div className="space-y-4 mb-6">
                                    {cart.map((item, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="w-16 h-16 bg-white rounded-sm overflow-hidden flex-shrink-0">
                                                <img src={item.image || item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-serif text-sm text-luxury-black">{item.brand}</p>
                                                <p className="text-xs text-gray-500">{item.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-gray-200 flex justify-between">
                                    <span className="font-bold text-luxury-black">Total to Pay</span>
                                    <span className="font-serif text-xl text-luxury-black">${totalPrice.toLocaleString()}</span>
                                </div>
                                {clientSecret && (
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-6 text-center leading-relaxed">
                                        Your payment is secured by industry-leading encryption. We do not store your financial information.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-32 md:pt-40 pb-20 px-6">
            <SEO title="Shopping Bag | PonteTIME" />

            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl md:text-5xl font-serif text-luxury-black mb-12 text-center">Your Selection</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-24 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-gray-500 mb-8 text-lg font-light">Your shopping bag is currently empty.</p>
                        <Link to="/shop" className="inline-block bg-luxury-black text-white px-10 py-4 uppercase tracking-widest text-sm font-bold hover:bg-luxury-gold transition-all duration-300">
                            Discover Timepieces
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                        {/* Cart Items List (Mobile View) */}
                        <div className="lg:w-2/3 space-y-8 md:hidden">
                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-sm">
                                    {/* Product Image */}
                                    <div className="w-20 h-24 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image || item.image_url}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h3 className="text-luxury-black font-serif text-base mb-1">{item.brand}</h3>
                                            <p className="text-gray-500 text-xs mb-1 line-clamp-1">{item.name}</p>
                                            <p className="font-serif text-luxury-black text-sm">
                                                {typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : item.price}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 text-[10px] uppercase tracking-widest flex items-center mt-2"
                                        >
                                            <Trash2 size={12} className="mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop View Item (Hidden on Mobile) */}
                        <div className="hidden md:block lg:w-2/3 space-y-8">
                            <div className="hidden md:flex justify-between border-b border-gray-200 pb-4 text-xs tracking-widest uppercase text-gray-500 font-bold">
                                <span>Product</span>
                                <span>Price</span>
                            </div>

                            {cart.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="flex flex-col md:flex-row gap-6 md:items-center border-b border-gray-100 pb-8 group">
                                    {/* Product Image */}
                                    <div className="w-full md:w-32 h-40 bg-gray-50 rounded-sm overflow-hidden flex-shrink-0 relative">
                                        <img
                                            src={item.image || item.image_url}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-luxury-black font-serif text-xl mb-1">{item.brand}</h3>
                                                <p className="text-gray-600 font-medium mb-2">{item.name}</p>
                                                <p className="text-gray-400 text-xs uppercase tracking-wider">{item.description || 'Reference: N/A'}</p>
                                            </div>
                                            {/* Mobile Price Display */}
                                            <div className="md:hidden text-lg font-serif text-luxury-black">
                                                {typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : item.price}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors text-xs uppercase tracking-widest mt-4 flex items-center group-hover:text-luxury-black"
                                        >
                                            <Trash2 size={14} className="mr-2" /> Remove
                                        </button>
                                    </div>

                                    {/* Desktop Price Display */}
                                    <div className="hidden md:block text-xl font-serif text-luxury-black min-w-[120px] text-right">
                                        {typeof item.price === 'number' ? `$${item.price.toLocaleString()}` : item.price}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="bg-gray-50 p-8 rounded-lg sticky top-32 border border-gray-100 shadow-sm">
                                <h3 className="text-2xl font-serif text-luxury-black mb-8 pb-4 border-b border-gray-200">Order Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">${totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-luxury-gold text-sm italic">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (Estimated)</span>
                                        <span className="text-gray-400 text-sm">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="flex justify-between mb-8 pt-4 border-t border-gray-200">
                                    <span className="font-bold text-luxury-black text-lg">Total</span>
                                    <span className="font-serif text-2xl text-luxury-black">${totalPrice.toLocaleString()}</span>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => setShowCheckout(true)}
                                        className="w-full bg-luxury-black text-white py-4 font-bold uppercase tracking-widest hover:bg-luxury-gold transition-colors flex items-center justify-center rounded-sm shadow-lg"
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <button className="w-full border border-gray-300 text-gray-600 py-3 text-xs uppercase tracking-widest hover:border-luxury-black hover:text-luxury-black transition-colors rounded-sm">
                                        Request Callback
                                    </button>
                                </div>

                                <div className="mt-8 flex justify-center items-center gap-4 text-gray-400">
                                    <i className="fas fa-lock text-xs"></i>
                                    <span className="text-[10px] uppercase tracking-wider">Secure SSL Encrypted Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Sticky Mobile Checkout Bar */}
            {cart.length > 0 && !showCheckout && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50 shadow-[0_-5px_20px_-15px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-xs uppercase tracking-widest">Grand Total</span>
                            <span className="font-serif text-xl text-luxury-black">${totalPrice.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={() => setShowCheckout(true)}
                            className="bg-luxury-black text-white px-8 py-3 font-bold uppercase tracking-widest text-sm rounded-sm"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
