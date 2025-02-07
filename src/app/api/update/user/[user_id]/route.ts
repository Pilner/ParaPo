import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

interface params {
	params: {
		user_id: string;
	};
}

export async function PUT(req: Request, params: params) {
	// Get the user_id from the params
	const user_id_params = params.params.user_id;

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

	const { user_id, username, password, confirmPassword } = await req.json();

	if (!user_id || !username || !password || !confirmPassword) {
		return new Response(JSON.stringify({ message: 'Missing parameter' }), {
			status: 400,
			headers,
		});
	}

	if (user_id != user_id_params) {
		return new Response(
			JSON.stringify({
				message: 'Invalid user_id',
				user_id,
				user_id_params,
			}),
			{
				status: 400,
				headers,
			}
		);
	}

	if (password !== confirmPassword) {
		return new Response(JSON.stringify({ message: 'Passwords do not match' }), {
			status: 400,
			headers,
		});
	}

	try {
		const user = await prisma.users.update({
			where: {
				user_id: parseInt(user_id_params),
			},
			data: {
				username: username,
				password: await bcrypt.hash(password, 10),
			},
			select: {
				user_id: true,
				username: true,
				created_at: true,
				updated_at: true,
			},
		});

		return new Response(
			JSON.stringify({
				user,
				message: 'User updated successfully',
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

		if ((error as any).code === 'P2025') {
			return new Response(JSON.stringify({ message: 'Item not found' }), {
				status: 404,
				headers,
			});
		}

		// if unique constraint failed
		if ((error as any).code === 'P2002') {
			return new Response(JSON.stringify({ message: 'Username already exists' }), {
				status: 409,
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
