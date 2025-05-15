/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // This prevents Tailwind from resetting styles
  },
  plugins: [],
}