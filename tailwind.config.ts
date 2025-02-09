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
				'base-hero-title': '3.75rem',
				'base-hero-subtitle': '1rem',
				'base-regular-title': '1.25rem',
				'base-regular-text': '0.8rem',
				'sm-hero-title': '6rem',
				'sm-hero-subtitle': '1.75rem',
				'sm-regular-title': '1.5rem',
				'sm-regular-text': '1rem',
				'md-hero-title': '7.5rem',
				'md-hero-subtitle': '2rem',
				'md-regular-title': '1.75rem',
				'md-regular-text': '1.25rem',
				'lg-hero-title': '4rem',
				'lg-hero-subtitle': '1.25rem',
				'lg-regular-title': '1.25rem',
				'lg-regular-text': '1rem',
				'xl-hero-title': '5.25rem',
				'xl-hero-subtitle': '1.5rem',
				'xl-regular-title': '1.5rem',
				'xl-regular-text': '1.25rem',
			},
		},
	},
	plugins: [],
} satisfies Config;
