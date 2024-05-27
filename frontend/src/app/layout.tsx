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
      <body>{children}</body>
    </html>
  );
}
