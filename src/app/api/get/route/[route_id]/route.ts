import { prisma } from '@/lib/prisma';

import { NextApiRequest } from 'next';

interface params {
	params: {
		route_id: string;
	};
}

export async function GET(req: NextApiRequest, params: params) {
	// Get the route_id from the params
	const route_id = params.params.route_id;

	let headers = {
		'Content-Type': 'application/json',
	};

	try {
		// Get a route and its locations
		const route = await prisma.routes.findUnique({
			where: {
				route_id: parseInt(route_id),
			},
			include: {
				Locations: true,
			},
		});

		return new Response(JSON.stringify(route), {
			status: 200,
			headers,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.name, error.message);
		}

		// Return an error message with status code 500 if an error occurs
		return new Response(JSON.stringify({ message: 'An error occurred' }), {
			status: 500,
			headers,
		});
	}
}
