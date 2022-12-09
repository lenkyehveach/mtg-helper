/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      persimmon: "#e75a0d",
      kobe: "#942911",
      lavender: "#eee5e9",
      gold: "#efc88b",
    },
    gridTemplateRows: {
      layout: "24rem 0 1fr",
    },
  },
  plugins: [],
};
