/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        brand: {
          green: "#83DF9C",
          forest: "#0c6056",
          navy: "#0C3C60",
          "dark-navy": "#07162f",
          deep: "#061826",
          beige: "#FAF2CA",
          coral: "#FF7E7E",
        }
      }
    },
  },
  plugins: [],
};
