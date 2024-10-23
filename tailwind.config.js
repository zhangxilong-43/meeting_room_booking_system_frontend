/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}