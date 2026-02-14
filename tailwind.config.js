/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'luxury-black': '#111827', // Dark text
                'luxury-gold': '#d4af37', // Accent
                'luxury-white': '#ffffff', // Background
                'luxury-gray': '#f3f4f6', // Secondary background
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
