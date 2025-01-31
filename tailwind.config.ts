import type { Config } from 'tailwindcss';

export default {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				accent: '#FF9270',
				black: '#141414',
				white: '#FFFFFF',
				gray: '#FCFCFC',
				'dark-gray': '#F4F4F4',
			},
			fontFamily: {
				primary: ['Poppins', 'sans-serif'],
				secondary: ['Open Sans', 'sans-serif'],
			},
			fontSize: {
				'hero-title': '6rem',
				'hero-subtitle': '2rem',
				'regular-title': '2rem',
				'regular-text': '1.25rem',
				'input-label': '1rem',
			},
		},
	},
	plugins: [],
} satisfies Config;
