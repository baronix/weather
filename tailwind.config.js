/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cold' : "url('./assets/cold.webp')",
        'hot' : "url('./assets/hot.webp')",
      }
    },
  },
  plugins: [],
}

