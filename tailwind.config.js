const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        // 'sm': '375px',
        // 'md' : ''
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
