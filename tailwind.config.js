/** @type {import('tailwindcss').Config} */
import colors from "./src/tailwind/colors";

const px0_200 = Array.from({ length: 201 }, (_, i) => `${i}px`);
const px0_20 = Array.from({ length: 21 }, (_, i) => `${i}px`);

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors,
      spacing: {
        ...px0_200,
      },
      borderWidth: {
        ...px0_20,
      },
    },
  },
  plugins: [],
};
