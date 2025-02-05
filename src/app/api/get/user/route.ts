import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
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

	const { searchParams } = new URL(req.url);
	const all = searchParams.get('all') === 'true';
	const page = parseInt(searchParams.get('page') || '1', 10);
	const limit = parseInt(searchParams.get('limit') || '10', 10);
	const skip = (page - 1) * limit;

	try {
		if (all) {
			const users = await prisma.users.findMany({
				select: {
					user_id: true,
					username: true,
					created_at: true,
					updated_at: true,
					password: false,
				},
				orderBy: {
					user_id: 'asc',
				},
			});

			const totalUsers = await prisma.users.count();

			return new Response(JSON.stringify({ users, totalUsers, page: 1, limit: totalUsers }), {
				status: 200,
				headers,
			});
		} else {
			const users = await prisma.users.findMany({
				skip,
				take: limit,
				select: {
					user_id: true,
					username: true,
					created_at: true,
					updated_at: true,
					password: false,
				},
				orderBy: {
					user_id: 'asc',
				},
			});

			const totalUsers = await prisma.users.count();

			return new Response(JSON.stringify({ users, totalUsers, page, limit }), {
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
