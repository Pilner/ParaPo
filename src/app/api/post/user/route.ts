import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextApiRequest } from 'next';

export async function POST(req: Request) {
	// Get the user_id from the params

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

	const { username, password, confirmPassword } = await req.json();

	if (!username || !password || !confirmPassword) {
		return new Response(JSON.stringify({ message: 'Missing parameter' }), {
			status: 400,
			headers,
		});
	}

	if (password !== confirmPassword) {
		return new Response(JSON.stringify({ message: 'Passwords do not match' }), {
			status: 400,
			headers,
		});
	}

	try {
		const user = await prisma.users.create({
			data: {
				username,
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
				message: 'User created successfully',
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

		// Return an error message if username already exists
		if ((error as any).code === 'P2002') {
			return new Response(
				JSON.stringify({
					message: 'Username already exists',
				}),
				{
					status: 409,
					headers,
				}
			);
		}

		// Return an error message with status code 500 if an error occurs
		return new Response(JSON.stringify({ message: 'An error occurred' }), {
			status: 500,
			headers,
		});
	}
}
