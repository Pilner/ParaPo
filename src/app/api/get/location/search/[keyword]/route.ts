import { prisma } from '@/lib/prisma';

import { NextApiRequest } from 'next';

interface params {
	params: {
		keyword: string;
	};
}

export async function GET(req: NextApiRequest, params: params) {
	// Get the keyword from the params
	const keyword = params.params.keyword;

	let headers = {
		'Content-Type': 'application/json',
	};

	try {
		// Get all locations containing the keyword including which route they are in based on route_name
		const locations = await prisma.locations.findMany({
			where: {
				OR: [
					{
						location_name: {
							contains: keyword,
						},
					},
					{
						Routes: {
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
							],
						},
					},
				],
			},
			// sort
			orderBy: {
				location_id: 'asc',
			},
		});

		return new Response(JSON.stringify(locations), {
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
