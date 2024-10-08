import { prisma } from "@/lib/prisma";

import { NextApiRequest } from "next";

interface params {
	params: {
		keyword: string;
	};
}

export async function GET(req: NextApiRequest, params: params) {
	// Get the keyword from the params
	const keyword = params.params.keyword;

	let headers = {
		"Content-Type": "application/json",
	};

	try {
		// Get all routes with route_name, category, and Location.location_name containing the keyword
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
			// sort
			orderBy: {
				route_id: "desc",
			},
		});

		return new Response(JSON.stringify(routes), {
			status: 200,
			headers,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.name, error.message);
		}

		// Return an error message with status code 500 if an error occurs
		return new Response(JSON.stringify({ message: "An error occurred" }), {
			status: 500,
			headers,
		});
	}
}
