import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import { NextApiRequest } from 'next';

interface params {
	params: {
		user_id: string;
	};
}

export async function DELETE(req: NextApiRequest, params: params) {
	// Get the user_id from the params
	const user_id = params.params.user_id;

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
		// check if data is the last row in the table
		const count = await prisma.users.count();
		if (count === 1) {
			return new Response(
				JSON.stringify({
					status: 400,
					message: 'Cannot delete the last user',
				}),
				{ headers }
			);
		}

		const user = await prisma.users.delete({
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

		return new Response(JSON.stringify({ user, count }), {
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
