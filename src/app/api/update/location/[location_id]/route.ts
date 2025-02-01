import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';

interface params {
	params: {
		location_id: string;
	};
}

export async function PUT(req: Request, params: params) {
	// Get the user_id from the params
	const location_id_params = params.params.location_id;

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

	const { location_id, location_name, longitude, latitude } = await req.json();

	if (!location_id || !location_name || !longitude || !latitude) {
		return new Response(JSON.stringify({ message: 'Missing parameter' }), {
			status: 400,
			headers,
		});
	}

	if (longitude < -180 || longitude > 180) {
		return new Response(JSON.stringify({ message: 'Longitude must be between -180 and 180' }), {
			status: 400,
			headers,
		});
	}

	if (latitude < -90 || latitude > 90) {
		return new Response(JSON.stringify({ message: 'Latitude must be between -90 and 90' }), {
			status: 400,
			headers,
		});
	}

	if (location_id != location_id_params) {
		return new Response(JSON.stringify({ message: 'Invalid location_id', location_id_params: location_id_params }), {
			status: 400,
			headers,
		});
	}

	try {
		const location = await prisma.locations.update({
			where: {
				location_id: parseInt(location_id_params),
			},
			data: {
				location_name,
				longitude: parseFloat(longitude),
				latitude: parseFloat(latitude),
			},
		});

		return new Response(
			JSON.stringify({
				location: location,
				message: 'Location updated successfully',
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
