import React from 'react';
import Image from 'next/image';

import Navbar from '@/_components/semantics/Navbar';
import Footer from '@/_components/semantics/Footer';

export default function NotFound() {
	return (
		<>
			<div className="flex h-screen flex-col">
				<Navbar />
				<section className="h-full flex-grow bg-gray pt-12 sm:pt-20 md:pt-24 lg:pt-0">
					<div className="m-auto h-full w-[90%] sm:w-[85%] lg:w-[80%] xl:w-[75%]">
						<div className="flex h-full flex-col items-center justify-center gap-4 text-center">
							<Image
								src="/images/questionmark.png"
								alt="Not Found Question Mark Picture"
								width={100}
								height={100}
								className="h-[8rem] w-auto object-contain"
								unoptimized={true}
							/>
							<h1 className="text-center font-primary text-base-hero-title font-bold leading-[90%] sm:text-lg-hero-title lg:text-xl-hero-title xl:text-hero-title">
								404 NOT
								<br />
								<span className="text-accent">FOUND</span>
							</h1>
							<p className="text-center font-secondary text-base-hero-subtitle font-normal leading-[100%] sm:text-lg-hero-subtitle lg:text-xl-hero-subtitle xl:text-hero-subtitle">
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
