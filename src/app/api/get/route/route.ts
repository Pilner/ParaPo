import { prisma } from "@/lib/prisma";

import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
	let headers = {
		"Content-Type": "application/json",
	};

	try {
		// Get all routes and their locations
		const routes = await prisma.routes.findMany({
			include: {
				Locations: true,
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
