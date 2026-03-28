/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                dark: {
                    50: '#f8fafc',
                    100: '#1e293b',
                    200: '#1a1f2e',
                    300: '#151922',
                    400: '#0f1218',
                    500: '#0a0c10',
                    600: '#050608',
                    700: '#030405',
                    800: '#020203',
                    900: '#000000',
                },
                accent: {
                    gold: '#D4A44C',
                    emerald: '#34D399',
                    slate: '#94A3B8',
                    orange: '#f97316',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'typewriter': 'typewriter 2s steps(40) forwards',
                'marquee': 'marquee 25s linear infinite',
                'marquee-reverse': 'marquee-reverse 25s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: 1, filter: 'brightness(1)' },
                    '50%': { opacity: 0.8, filter: 'brightness(1.2)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(100%)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-100%)', opacity: 0 },
                    '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
                typewriter: {
                    '0%': { width: '0' },
                    '100%': { width: '100%' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(135deg, #0a0c10 0%, #1a1f2e 50%, #0a0c10 100%)',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(212, 164, 76, 0.3)',
                'glow-lg': '0 0 40px rgba(212, 164, 76, 0.4)',
                'glow-emerald': '0 0 20px rgba(52, 211, 153, 0.3)',
            },
        },
    },
    plugins: [],
}
