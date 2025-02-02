import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { ToastContainer } from 'react-toastify';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'ParaPo',
	description: 'A Navigation App Tailored for Public Utility Vehicles and Commuters.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<script src="https://kit.fontawesome.com/ad98de5722.js" crossOrigin="anonymous"></script>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
				<ToastContainer />
			</body>
		</html>
	);
}
