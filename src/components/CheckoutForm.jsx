import { useState, useEffect } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

const CheckoutForm = ({ totalPrice, formData, cart }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    setIsSuccess(true);
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/cart?success=true`,
                receipt_email: formData.email,
                shipping: {
                    address: {
                        city: formData.city,
                        country: formData.country,
                        line1: formData.address,
                        postal_code: formData.zip,
                    },
                    name: `${formData.firstName} ${formData.lastName}`,
                    phone: formData.phone,
                }
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    if (isSuccess) {
        return (
            <div className="text-center py-12 space-y-6">
                <div className="flex justify-center">
                    <CheckCircle2 className="text-green-500 w-16 h-16" />
                </div>
                <h2 className="text-3xl font-serif text-luxury-black">THANK YOU FOR YOUR PURCHASE</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    Your order for the amount of <span className="font-bold text-luxury-black">${totalPrice.toLocaleString()}</span> has been confirmed.
                    Our concierge will contact you shortly with the shipping details.
                </p>
                <div className="pt-8">
                    <a href="/" className="bg-luxury-black text-white px-8 py-3 uppercase tracking-widest font-bold hover:bg-luxury-gold transition-all">
                        Return home
                    </a>
                </div>
            </div>
        );
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm uppercase tracking-widest text-gray-500 font-bold">Total Amount</span>
                    <span className="text-2xl font-serif text-luxury-black">${totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-tighter text-center">
                    Secure transaction powered by Stripe. Your card data is never stored on our servers.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">Secure Payment Method</h3>
                <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
            </div>

            {message && (
                <div id="payment-message" className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                    <AlertCircle size={18} />
                    {message}
                </div>
            )}

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-luxury-black text-white py-5 font-bold uppercase tracking-[0.3em] text-sm hover:bg-luxury-gold transition-all disabled:opacity-50 flex items-center justify-center shadow-xl group"
            >
                {isLoading ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                ) : (
                    <span className="group-hover:scale-110 transition-transform">Authorize Payment</span>
                )}
            </button>

            <div className="flex items-center justify-center gap-6 opacity-30 grayscale mt-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-6" />
            </div>
        </form>
    );
};

export default CheckoutForm;
