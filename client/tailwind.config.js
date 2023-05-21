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
    },
  },
  plugins: [daisyui],
};
