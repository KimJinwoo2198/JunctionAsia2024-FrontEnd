/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FF7B42",
				disabled: "#FFB08E",
				box: "#F2F4F6",
				text: "#25252C",
				subtext: "#8D8D8D",
			},
		},
	},
	plugins: [],
};
