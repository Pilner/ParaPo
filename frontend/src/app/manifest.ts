import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'ParaPo',
		short_name: 'ParaPo',
		description: 'A Navigation App Tailored for Public Utility Vehicles and Commuters.',
		start_url: '/',
		display: 'standalone',
		background_color: '#FCFCFC',
		theme_color: '#FF9270',
		icons: [
			{
				src: "/images/icon-192.png",
				sizes: "192x192",
				type: "image/png"
			},
			{
				src: "/images/icon-512.png",
				sizes: "512x512",
				type: "image/png"
			},
			{
				src: "/images/apple-icon.png",
				sizes: "180x180",
				type: "image/png"
			}
		],
	}
}