/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'red': '#fc4747',
        'darkBlue': '#10141e',
        'semiDarkBlue': '#161d2f',
        'greyishBlue': '#5a698f',
      },
      fontFamily: {
        'customFont': ['Outfit', 'sans-serif']
      },
      colors: {
        'textHover': '#5a698f'
      }
    },
  },
  plugins: [],
}

