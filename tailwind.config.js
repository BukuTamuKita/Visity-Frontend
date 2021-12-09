const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screen: {
            'xs': '360px',
            ...defaultTheme.screens,
        },
        extend: {
            colors: {
                primary: '#2E4DA7',
                primaryHover: '#1B398F',
                primaryFocus: '#9CA9D7',
                primaryOutline: '#E7EAF5',
                secondary: '#FDB537',
                secondaryHover: '#F99431',
                secondaryFocus: '#FFE08D',
                accent: '#E7EBF8',
                darkerAccent: '#C7D2FF',
                success: '#14760F',
                successShade: '#E5FAD1',
                danger: '#B3350C',
                dangerShade: '#FDE9CE',
                warning: '#7A6200',
                warningShade: '#FEFACB',
                info: '#38CFE0',
            },
        },
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")],
};
