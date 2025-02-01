'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

type Props = {
	children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				{children}
				{/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" /> */}
			</QueryClientProvider>
		</SessionProvider>
	);
};
