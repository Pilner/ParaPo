import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

interface params {
	params: {
		keyword: string;
	};
}

export async function GET(req: NextRequest, params: params) {
	// Get the keyword from the params
	const keyword = params.params.keyword;

	let headers = {
		'Content-Type': 'application/json',
	};

	const { searchParams } = new URL(req.url);
	const all = searchParams.get('all') === 'true';
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '10', 10);
	const skip = (page - 1) * limit;

	try {
		if (all) {
			const routes = await prisma.routes.findMany({
        where: {
					OR: [
						{
							route_name: {
								contains: keyword,
							},
						},
						{
							category: {
								contains: keyword,
							},
						},
						{
							Locations: {
								some: {
									location_name: {
										contains: keyword,
									},
								},
							},
						},
					],
				},
				include: {
					Locations: true,
				},
				orderBy: {
					route_id: 'asc',
				},
			});

			// Get the total count of routes
			const totalRoutes = await prisma.routes.count({
				where: {
					OR: [
						{
							route_name: {
								contains: keyword,
							},
						},
						{
							category: {
								contains: keyword,
							},
						},
						{
							Locations: {
								some: {
									location_name: {
										contains: keyword,
									},
								},
							},
						},
					],
				},
			});

			return new Response(JSON.stringify({ routes, totalRoutes, page: 1, limit: totalRoutes }), {
				status: 200,
				headers,
			});
		} else {
			// Get all routes with route_name, category, and Location.location_name containing the keyword
			const routes = await prisma.routes.findMany({
				skip,
				take: limit,
				where: {
					OR: [
						{
							route_name: {
								contains: keyword,
							},
						},
						{
							category: {
								contains: keyword,
							},
						},
						{
							Locations: {
								some: {
									location_name: {
										contains: keyword,
									},
								},
							},
						},
					],
				},
				include: {
					Locations: true,
				},
				// sort
				orderBy: {
					route_id: 'asc',
				},
			});

			// Get the total count of routes
			const totalRoutes = await prisma.routes.count({
				where: {
					OR: [
						{
							route_name: {
								contains: keyword,
							},
						},
						{
							category: {
								contains: keyword,
							},
						},
						{
							Locations: {
								some: {
									location_name: {
										contains: keyword,
									},
								},
							},
						},
					],
				},
			});

			return new Response(JSON.stringify({ routes, totalRoutes, page, limit }), {
				status: 200,
				headers,
			});
		}
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
