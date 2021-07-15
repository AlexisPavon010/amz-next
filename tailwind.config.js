module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}',
   './components/**/*.{js,ts,jsx,tsx}' ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          ligth: '#232f3E',
          DEFAULT: '#131921',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
