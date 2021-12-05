const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#2E4DA7",
                "primary-hover": "#3F538F",
                secondary: "#FDB537",
                accent: "#E7EBF8",
                "darker-accent": "#C7D2FF",
                success: "#14760F",
                "success-shade": "#E5FAD1",
                info: "#38CFE0",
                warning: "#FEDC00",
                danger: "#B3350C",
            },
        },
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")],
};
