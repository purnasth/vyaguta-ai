/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        wave: 'wave 2.5s ease-in-out infinite',
        'typing-gradient': 'typing-gradient 1.8s ease-in-out infinite',
        'bounce-dot': 'bounce-dot 1.4s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'gradient-shift': 'gradient-shift 3s linear infinite',
        'shadow-glow': 'shadow-glow 2s linear infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        'typing-gradient': {
          '0%, 80%, 100%': {
            transform: 'scale(0.6)',
            opacity: 0.4,
            backgroundPosition: '0% 50%',
          },
          '40%': {
            transform: 'scale(1)',
            opacity: 1,
            backgroundPosition: '100% 50%',
          },
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
        'shadow-glow': {
          '0%': { boxShadow: '0 0 10px 3px rgba(46, 204, 113, 0.7)' },
          '16%': { boxShadow: '0 0 10px 3px rgba(52, 152, 219, 0.7)' },
          '33%': { boxShadow: '0 0 10px 3px rgba(155, 89, 182, 0.7)' },
          '50%': { boxShadow: '0 0 10px 3px rgba(231, 76, 60, 0.7)' },
          '66%': { boxShadow: '0 0 10px 3px rgba(243, 156, 18, 0.7)' },
          '83%': { boxShadow: '0 0 10px 3px rgba(46, 204, 113, 0.7)' },
          '100%': { boxShadow: '0 0 10px 3px rgba(46, 204, 113, 0.7)' },
        },
      },
    },
  },
  plugins: [],
};
