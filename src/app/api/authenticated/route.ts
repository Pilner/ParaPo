import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: Request) {
	// Set headers
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

	return new Response(
		JSON.stringify({
			status: 200,
			message: 'Authenticated',
		}),
		{ headers }
	);
}
