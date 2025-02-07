import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import { NextApiRequest } from 'next';

interface params {
	params: {
		user_id: string;
	};
}

export async function GET(req: NextApiRequest, params: params) {
	// Get the user_id from the params
	const user_id = params.params.user_id;

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

	try {
		const user = await prisma.users.findUnique({
			select: {
				user_id: true,
				username: true,
				created_at: true,
				updated_at: true,
				password: false,
			},
			where: {
				user_id: parseInt(user_id),
			},
		});

		return new Response(JSON.stringify(user), {
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
