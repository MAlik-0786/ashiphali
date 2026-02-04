/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00ff88',
                dark: {
                    900: '#0a0a0a',
                    800: '#111111',
                    700: '#1a1a1a',
                    600: '#2a2a2a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-in': 'slideIn 0.6s ease-out',
                'glow': 'glow 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.4)' },
                },
            },
        },
    },
    plugins: [],
}
