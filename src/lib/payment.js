import { supabase } from './supabase';

/**
 * Creates a Payment Intent via Supabase Edge Functions
 * @param {Array} items - Cart items
 * @param {number} amount - Total amount in cents
 * @param {Object} shipping - Shipping details
 * @returns {Promise<Object>} - Payment Intent client secret
 */
export const createPaymentIntent = async (items, amount, shipping) => {
    try {
        const { data, error } = await supabase.functions.invoke('create-payment-intent', {
            body: {
                items,
                amount: Math.round(amount * 100), // Stripe expects cents
                shipping,
                currency: 'usd',
            },
        });

        if (error) throw error;
        return data; // Should contain clientSecret
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};
