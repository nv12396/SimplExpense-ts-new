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
        primaryGreen: "#78ED92",
        secondaryGreen: "#4ECB71",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "2000px",
      },
    },
  },
  plugins: [daisyui],
};
