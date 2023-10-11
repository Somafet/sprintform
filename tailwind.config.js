// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans]
			},
			colors: {
				primary: {
					50: "#effefc",
					100: "#c8fff8",
					200: "#90fff0",
					300: "#51f7e8",
					400: "#1de4d8",
					500: "#05c7bf",
					600: "#00a19d",
					700: "#05807e",
					800: "#0a6565",
					900: "#0e5253",
					950: "#004346"
				}
			}
		}
	},
	plugins: [require("@tailwindcss/forms")]
};
