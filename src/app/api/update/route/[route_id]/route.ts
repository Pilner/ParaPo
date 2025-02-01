import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';

interface params {
	params: {
		route_id: string;
	};
}

export async function PUT(req: Request, params: params) {
	// Get the user_id from the params
	const route_id_params = params.params.route_id;

	let headers = {
		'Content-Type': 'application/json',
	};

	const session = await getServerSession(authOptions);
	if (!session) {
		return new Response(
			JSON.stringify({
				status: 401,
				message: 'Unauthorized',
			}),
			{ headers }
		);
	}

	const { route_id, route_name, category, min_fare } = await req.json();

	if (!route_id || !route_name || !category || !min_fare) {
		return new Response(JSON.stringify({ message: 'Missing parameter' }), {
			status: 400,
			headers,
		});
	}

	if (route_id != route_id_params) {
		return new Response(JSON.stringify({ message: 'Invalid route_id', route_id_params }), {
			status: 400,
			headers,
		});
	}

	try {
		const route = await prisma.routes.update({
			where: {
				route_id: parseInt(route_id_params),
			},
			data: {
				route_name,
				category,
				min_fare: parseFloat(min_fare),
			},
		});

		return new Response(
			JSON.stringify({
				route,
				message: 'Route updated successfully',
			}),
			{
				status: 200,
				headers,
			}
		);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.name, error.message);
		}

		if ((error as any).code === 'P2025') {
			return new Response(JSON.stringify({ message: 'Item not found' }), {
				status: 404,
				headers,
			});
		}

		// Return an error message with status code 500 if an error occurs
		return new Response(JSON.stringify({ message: 'An error occurred' }), {
			status: 500,
			headers,
		});
	}
}
