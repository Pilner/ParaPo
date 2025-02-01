import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
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
		const users = await prisma.users.findMany({
			select: {
				user_id: true,
				username: true,
				created_at: true,
				updated_at: true,
				password: false,
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
