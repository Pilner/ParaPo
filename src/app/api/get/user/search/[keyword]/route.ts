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
		// Get all users containing the keyword
		const users = await prisma.users.findMany({
			where: {
				OR: [
					{
						username: {
							contains: keyword,
						},
					},
				],
			},
			// sort
			orderBy: {
				user_id: 'asc',
			},
		});

		return new Response(JSON.stringify(users), {
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
