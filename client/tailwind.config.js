/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/hero.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
