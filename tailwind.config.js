/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1220',
        'midnight-card': '#111B2E',
        'midnight-border': '#1E293B',
        ocean: '#0E7490',
        teal: '#14B8A6',
        sand: '#F3E9D2',
        'warm-white': '#FAFAF7',
        gold: '#E9B949',
        muted: '#8B97A8'
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(20, 184, 166, 0.25)',
        'glow-gold': '0 0 25px -5px rgba(233, 185, 73, 0.25)',
        'premium-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
