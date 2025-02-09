import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { Location } from '@/_types/Models';

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
				message: 'Unauthorized',
			}),
			{ headers, status: 401 }
		);
	}

	const { route_id, route_name, category, min_fare, Locations } = await req.json();

	if (!route_id || !route_name || !category || !min_fare || !Locations) {
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
		const locationsDB = await prisma.locations.findMany({
			where: {
				route_id: parseInt(route_id_params),
			},
		});

		// if locationsDB and Locations does not have the same contents, delete all locations and add the new ones
		if (
			locationsDB.length !== Locations.length ||
			locationsDB.some((location, index) => {
				return location.location_id !== Locations[index].location_id;
			})
		) {
			// Delete all locations associated with the route
			await prisma.locations.deleteMany({
				where: {
					route_id: parseInt(route_id_params),
				},
			});

			// Update the route and add the locations
			const route = await prisma.routes.update({
				where: {
					route_id: parseInt(route_id_params),
				},
				data: {
					route_name,
					category,
					min_fare,
					Locations: {
						createMany: {
							data: Locations,
						},
					},
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
		} else {
			const route = await prisma.$transaction([
				prisma.routes.update({
					where: { route_id: parseInt(route_id_params) },
					data: { route_name, category, min_fare },
				}),
				...Locations.map((location: Location) =>
					prisma.locations.update({
						where: { location_id: location.location_id },
						data: {
							location_name: location.location_name,
							longitude: location.longitude,
							latitude: location.latitude,
						},
					})
				),
			]);

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
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.name, error.message);
		}

		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
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
