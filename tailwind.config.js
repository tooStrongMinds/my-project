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
        'textHover': '#5a698f',
        'redHover': '#fc4747'
      },
      scrollbar: {
        width: '4px',
        height: '4px',
        thumb: {
          borderRadius: '10px',
          backgroundColor: '#fc4747',
          borderWidth: '2px',
        },
        track: {
          backgroundColor: '#161d2f'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

