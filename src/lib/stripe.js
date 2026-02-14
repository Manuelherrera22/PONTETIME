import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe Publishable Key
// You can find this in your Stripe Dashboard (Developers > API keys)
const stripePromise = loadStripe('pk_test_placeholder_key_from_stripe');

export default stripePromise;
