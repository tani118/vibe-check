/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: '#08D9D6',
        black: '#252A34',
        red: '#FF2E63',
        grey: '#EAEAEA',
      },
    },
  },
  plugins: [],
}
