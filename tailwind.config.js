const plugin = require('tailwindcss/plugin');

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: "#2E4DA7",
                "primary-hover": "#3F538F",
                secondary: "#7D8CF0",
                accent: "#E7EBF8",
                "darker-accent": "#C7D2FF",
                success: "#10B981",
                info: "#3B82F6",
                warning: "#F59E0B",
                danger: "#EF4444",
            },
        },
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")],
};
