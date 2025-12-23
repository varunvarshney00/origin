/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Add the keyframes for our fire animation
      keyframes: {
        fire: {
          "0%, 100%": {
            transform: "scale(1) translateY(0)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.1) translateY(-5px)",
            opacity: "0.8",
          },
        },
      },
      // Add the animation utility
      animation: {
        fire: "fire 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};