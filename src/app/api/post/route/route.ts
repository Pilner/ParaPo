import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import { NextApiRequest } from 'next';

import { Route, Location } from '@/_types/Map';

export async function POST(req: Request) {
	// Get the user_id from the params

	let headers = {
		'Content-Type': 'application/json',
	};

	const session = await getServerSession(authOptions);
	if (!session) {
		return new Response(
			JSON.stringify({
				message: 'Unauthorized',
			}),
			{ headers, status: 401 }
		);
	}

	const { route_name, category, min_fare, Locations } = await req.json();

	if (!route_name || !category || !min_fare || !Locations) {
		return new Response(JSON.stringify({ message: 'Missing parameter' }), {
			status: 400,
			headers,
		});
	}

	Locations.forEach((location: Location, index: number) => {
		if (!location.location_name || !location.longitude || !location.latitude) {
			return new Response(
				JSON.stringify({
					message: 'Missing parameter',
					missing: `Location ${index}: ${location.location_name ? (location.longitude ? 'latitude' : 'longitude') : 'location_name'}`,
				}),
				{
					status: 400,
					headers,
				}
			);
		}
	});

	try {
		const route: any = await prisma.routes.create({
			data: {
				route_name: route_name,
				category: category,
				min_fare: min_fare,
				Locations: {
					create: Locations,
				},
			},
		});

		return new Response(
			JSON.stringify({
				route,
				message: 'Route created successfully',
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

		// Return an error message with status code 500 if an error occurs
		return new Response(JSON.stringify({ message: 'An error occurred' }), {
			status: 500,
			headers,
		});
	}
}
