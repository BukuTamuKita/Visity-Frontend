const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screen: {
            xs: "360px",
            ...defaultTheme.screens,
        },
        extend: {
            boxShadow: {
                template: "0 8px 24px rgba(0, 0, 0, 0.15)",
                mobile: "0 3px 6px rgba(0, 0, 0, 0.15)",
            },
            colors: {
                primary: "#2E4DA7",
                primaryHover: "#1B398F",
                primaryFocus: "#9CA9D7",
                primaryOutline: "#E7EAF5",
                secondary: "#FFCB47",
                secondaryHover: "#F99431",
                secondaryFocus: "#FFE08D",
                accent: "#E7EBF8",
                darkerAccent: "#C7D2FF",
                success: "#14760F",
                successShade: "#E5FAD1",
                danger: "#B3350C",
                dangerShade: "#FDE9CE",
                warning: "#7A6200",
                warningShade: "#FEFACB",
                info: "#38CFE0",
                "primary-50": "#E7EAF5",
                "primary-100": "#C3CBE7",
                "primary-900": "#0A277A",
                "grey-100": "#FBF9FF",
                "grey-200": "#F7F4FD",
                "grey-400": "#E2E0E8",
                "grey-500": "#BFBDC5",
                "grey-700": "#444249",
                "grey-900": "#232127",
            },
        },
    },
    variants: {},
    plugins: [require("@tailwindcss/forms")],
};
