import NextAuth, { User, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Username',
			credentials: {
				// Change this to your own credentials (e.g. Email+Password, Phone+PIN, etc.)
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					if (!credentials) {
						throw new Error('No Credentials Provided');
					}
					// Handle Authorization
					// Example: Fetch user from DB
					const user = await prisma.users.findUnique({
						where: {
							username: credentials.username,
						},
					});

					if (user) {
						// Don't forget to do validation (e.g. Hash Password)

						const isValid = await bcrypt.compare(credentials.password, user.password);

						if (!isValid) {
							throw new Error('Invalid Credentials');
						}

						return {
							id: user.user_id.toString(),
							username: user.username,
						};
					} else {
						throw new Error('Invalid Credentials');
					}
				} catch (error) {
					return null;
				}
			},
		}),
	],
	// pages: {
	// 	signIn: '/auth/signin',
	// 	signOut: '/auth/signout',
	// 	error: '/auth/error', // Error code passed in query string as ?error=
	// 	verifyRequest: '/auth/verify-request', // (used for check email message)
	// 	newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
	// },
	// This is where you can modify the session and JWT token
	callbacks: {
		session: ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id, // Change id into your User ID Name from your DB
				},
			};
		},
		jwt: ({ token, user }) => {
			if (user) {
				const u = user as unknown as User;
				return {
					...token,
					id: u.id, // Change id into your User ID Name from your DB
				};
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
