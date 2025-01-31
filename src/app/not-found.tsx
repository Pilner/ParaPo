import React from 'react';
import Image from 'next/image';

import Navbar from '@/_components/semantics/Navbar';
import Footer from '@/_components/semantics/Footer';

export default function NotFound() {
	return (
		<>
			<div className="flex h-screen flex-col">
				<Navbar />
				<section className="h-full flex-grow bg-gray">
					<div className="m-auto flex h-full w-3/4 items-center justify-center">
						<div className="flex flex-col items-center justify-center gap-4 text-center">
							<Image
								src="/images/questionmark.png"
								alt="Not Found Question Mark Picture"
								width={100}
								height={100}
								className="h-[8rem] w-auto object-contain"
								unoptimized={true}
							/>
							<h1 className="font-primary text-hero-title font-bold leading-[90%]">
								404 NOT
								<br />
								<span className="text-accent">FOUND</span>
							</h1>
							<p className="font-secondary text-hero-subtitle font-normal leading-[100%]">
								Oops! The page you're looking for
								<br />
								doesn't exist.
							</p>
						</div>
					</div>
				</section>
				<Footer />
			</div>
		</>
	);
}
