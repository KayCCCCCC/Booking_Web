/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/pages/SignInPage.tsx'
  ],
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
      colors: {
        primary: "rgb(255 48 96)",
      },
      borderRadius: {
        lg: "1rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "spotlight": {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)"
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        "move-down": {
          from: {
            transform: "translate(0, -100%)"
          },
          to: {
            transform: "translate(0, 0%)"
          }
        }

      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spotlight": "spotlight 2s ease .75s 1 forwards",
        "move-down": "move-down 2s ease-in "
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      width: {

      },
      height: {
        md: "600px"
      },

    },
  },
  plugins: [require("tailwindcss-animate")],
}