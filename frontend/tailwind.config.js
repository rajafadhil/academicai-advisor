/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          navy: "#1e3a8a",       // Navy Blue Utama
          navyDark: "#0f172a",   // Slate Dark
          emerald: "#10b981",    // Emerald Green Aksen
          emeraldDark: "#059669",
          slateBg: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};
