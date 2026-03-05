/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        wave: 'wave 2.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        typing: 'typing 1s ease-in-out infinite',
        'bounce-dot': 'bounce-dot 1.4s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'gradient-shift': 'gradient-shift 3s linear infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        typing: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
    backgroundImage: {
      'vyaguta-gradient':
        'radial-gradient(111.4% 111.43% at 111.17% 111.43%, #f5af00 6.69%, #c3cb2c 15.86%, #09a781 42.41%, #102b7b 87.64%)',
      'vyaguta-gradient-loading':
        'linear-gradient(45deg, #2ecc71, #3498db, #9b59b6, #e74c3c, #f39c12, #2ecc71)',
      'vyaguta-bg':
        'radial-gradient(100% 100% at 0% 0%, rgba(245, 176, 0, 0.2), transparent 15%), radial-gradient(90% 90% at 6% 8%, rgba(255, 185, 80, 0.1), transparent 25%), radial-gradient(140% 140% at 12% 14%, rgba(70, 200, 150, 0.14), transparent 30%), radial-gradient(160% 160% at 18% 20%, rgba(40, 120, 110, 0.12), transparent 40%)',
    },
  },
  plugins: [],
};
