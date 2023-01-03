/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          400: '#f2f5f1',
          600: '#aaaeb8'
        },
        'secondary': '#0e1511',
        'accent': '#3e554b',
        'black': '#2d2c37',
        'light': '#dadada'
      },
      gridTemplateColumns: {
        'ui': '1fr 4fr'
      }
    },
  },
  plugins: [],
}
