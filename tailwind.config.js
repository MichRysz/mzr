/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-dark": "#bb0808",  // Ciemnoczerwony
        "color-light": "#ff7878", // Jasnoczerwony
      },
    },
  },
  plugins: [],
};
