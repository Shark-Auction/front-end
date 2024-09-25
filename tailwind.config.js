/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-in-out',
        fadeInDown: 'fadeInDown 1s ease-in-out',
        fadeInRight: 'fadeInRight 1s ease-in-out',
        fadeInLeft:  'fadeInLeft 1s ease-in-out'
      },
      colors: {
        primaryColor: '#59C5FF'
      },
      boxShadow: {
        shadowHeavy: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
        shadowLight: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;'
      },
      container: {
        padding: '5rem'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #59C5FF, #3b82f6, #69caff)',
        'gradient-secondary': 'linear-gradient(to right, rgba(89, 197, 255, 0.5), rgba(59, 130, 246, 0.5), rgba(105, 202, 255, 0.5))',
        'gradient-orange': 'linear-gradient(to right, #FFA726, #FB8C00, #F57C00, #EF6C00)',
        'gradient-red': 'linear-gradient(to right, #ff3232, #e50000, #ff3232)',
        'gradient-header': 'linear-gradient(90deg, rgba(0,215,255,1) 10%, rgba(0,176,255,1) 30%, rgba(70,165,226,1) 50%, rgba(0,176,255,1) 70%, rgba(0,215,255,1) 90%)',
        'gradient-rating' : 'radial-gradient(circle, rgba(253,255,184,1) 0%, rgba(149,255,102,1) 91%, rgba(48,255,187,1) 100%)'
      },
    },
  },
  plugins: [],
}

