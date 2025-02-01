import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import { NextApiRequest } from 'next';

interface params {
	params: {
		route_id: string;
	};
}

export async function DELETE(req: NextApiRequest, params: params) {
	// Get the route_id from the params
	const route_id = params.params.route_id;

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

	try {
		const count = await prisma.routes.count();

		const route = await prisma.routes.delete({
			select: {
				route_id: true,
				created_at: true,
				updated_at: true,
				Locations: true,
			},
			where: {
				route_id: parseInt(route_id),
			},
		});

		return new Response(JSON.stringify({ route, count }), {
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
