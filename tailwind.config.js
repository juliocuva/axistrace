/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        mono: ["var(--font-montserrat)", "monospace"],
      },
      colors: {
        brand: {
          green: "#83DF9C",
          navy: "#0C3C60",
          "dark-navy": "#082840",
          beige: "#FAF2CA",
          coral: "#FF7E7E",
        }
      }
    },
  },
  plugins: [],
};
