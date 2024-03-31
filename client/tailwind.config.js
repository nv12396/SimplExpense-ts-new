/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html", // <= add this
    "./src/**/*.{js,ts,jsx,tsx}", // <= no spaces
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f1f2c",
        secondary: "#272638",
        primaryGreen: "#4ac5b6",
        secondaryGreen: "#4ECB71",
      },
      screens: {
        sm: "680px",
        md: "1110px",
        lg: "1550px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "2000px",
      },
      gridTemplateRows: {
        12: "repeat(12, minmax(0, 1fr))",
      },
      gridRow: {
        "span-10": "span 10 / span 10",
      },
    },
  },
  plugins: [daisyui],
};
