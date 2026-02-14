import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@11.16.0?target=deno"

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
    httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { items, amount, shipping, currency } = await req.json()

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency || 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            shipping: {
                name: shipping.name,
                address: {
                    line1: shipping.address,
                    city: shipping.city,
                    postal_code: shipping.zip,
                    country: shipping.country,
                },
            },
            metadata: {
                order_items: JSON.stringify(items.map(i => i.id)),
                customer_email: shipping.email
            }
        })

        return new Response(
            JSON.stringify({ clientSecret: paymentIntent.client_secret }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
