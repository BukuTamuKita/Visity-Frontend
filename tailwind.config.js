const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#2E4DA7',
        'secondary': '#7D8CF0',
        'accent': '#E7EBF8',
        'darker-accent': '#C7D2FF',
        'success': '#10B981',
        'info': '#10B981',
        'warning': '#10B981',
        'danger': '#10B981',
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
