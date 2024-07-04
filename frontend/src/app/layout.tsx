import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "ParaPo",
	description:
		"A Navigation App Tailored for Public Utility Vehicles and Commuters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<head>
				<script
					src="https://kit.fontawesome.com/ad98de5722.js"
					crossOrigin="anonymous"
				></script>
			</head>
			<body>{children}</body>
		</html>
  );
}
