export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		// This is where you can add which routes to be protected
		// '/sampleRoute',
		// '/sampleRoute/:path*', // This is an example of a dynamic route
	],
};
