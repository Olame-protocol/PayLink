/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "satoshi",
        fontsprint: ["Integral CF", ...fontFamily.sans],
      },
      colors: {
        /** primary */
        prosperity: "#FCFF52",
        forest: "#0E3A36",
        magenta: "#AED5CA",
        "green-petrolium": "#D9FC99",
        /** base */
        gypsum: "#FCF6F1",
        sand: "#E7E3D4",
        wood: "#655947",
        fig: "#1E002B",
        /** functional */
        snow: "#FFFFFF",
        onyx: "#000000",
        success: "#329F3B",
        error: "#E70532",
        disabled: "#9B9B9B",
        /** accent */
        sky: "#7CC0FF",
        citrus: "#FF9A51",
        lotus: "#FFA3EB",
        lavender: "#B490FF",
      },
    },
  },
  plugins: [],
};
