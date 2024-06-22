/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

// {
//   "clientName": "Jonathan Zihindula",
//   "clientEmail": "jonthanzihindula@gmail.com",
//   "invoiceDate": "23-12-2024",
//   "productName": "Wed dev",
//   "brandingName": "Ogopa Studio",
//   "productPrice": "1000",
//   "brandingImage": "https://rmjqlmzwqclqjhzfjigi.supabase.co/storage/v1/object/public/images/brandings/branding-b2dc1f78-3c6d-4c1c-b819-554134b41d58",
//   "invoiceAmount": "1000",
//   "walletAddress": "0x0000000000000000",
//   "paymentDueDate": "26-6-2024",
//   "brandingAddress": "KG 375 st",
//   "brandingContact": "info@ogopastudio.com",
//   "invoiceQuantity": "1",
//   "invoiceDescription": "Bulding a web landing page",
//   "invoicePaymentLink": "https://00000000000000000000",
//   "productDescription": "Web development"
// }
