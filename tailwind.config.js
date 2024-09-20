/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#59C5FF'
      },
      boxShadow: {
        shadowHeavy: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
        shadowLight: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;'
      },
      container: {
        padding: '10rem'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #59C5FF, #3b82f6, #69caff)',
        'gradient-secondary': 'linear-gradient(to right, rgba(89, 197, 255, 0.5), rgba(59, 130, 246, 0.5), rgba(105, 202, 255, 0.5))',
      },
    },
  },
  plugins: [],
}

