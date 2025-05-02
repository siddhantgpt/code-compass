/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInStart: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        accordionExpand: {
          '0%': { opacity: '0', maxHeight: '0' },
          '100%': { opacity: '1', maxHeight: '1000px' },
        },
      },
      animation: {
        fadeIn: 'fadeInStart 0.6s ease-out forwards',
        accordionExpand: 'accordionExpand 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
