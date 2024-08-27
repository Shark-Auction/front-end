/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#37B1F3'
      },
      boxShadow: {
        shadowHeavy: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
        shadowLight: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;'
      }
    },
  },
  plugins: [],
}

