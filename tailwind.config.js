module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: () => {
        return {
          DEFAULT: {
            css: {
              'code::before': false,
              'code::after': false,
              'blockquote p:first-of-type::before': false,
              'blockquote p:last-of-type::after': false,
            },
          },
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
