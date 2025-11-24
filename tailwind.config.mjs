/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily:{
				merriweatherSans: ["Merriweather Sans", "sans-serif"],
				raleway	: ['Raleway', 'sans-serif'],
			},
			colors: {
			'bg-dark': '#1A1A1A',
			'bg-light': '#FFFFFF',
			'primary': '#F7A71D',
			'primary-light': '#FFF27C',
			'primary-dark': '#7F350B',
			'secondary-dark': '#808080',
			'secondary': '#B3B3B3',
			'secondary-light': '#F5F5F5',
			'accent1': '#02A5FF',
			'accent-light': '#93D8FF',
			},
		},
		darkMode: 'class',
	},
	plugins: [],
};
