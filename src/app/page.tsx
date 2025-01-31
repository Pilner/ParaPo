import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '@/_components/semantics/Navbar';
import Footer from '@/_components/semantics/Footer';
import Button from '@/_components/Button';

export default function Home() {
	return (
		<>
			<div className="flex h-screen flex-col">
				<Navbar />
				<section className="bg-gray h-full flex-grow">
					<div className="m-auto h-full w-3/4">
						<div className="flex h-full gap-16">
							<div className="flex h-full flex-1 flex-col justify-center gap-4 text-black">
								<h1 className="font-primary text-hero-title font-bold leading-[90%]">
									NAVIGATE <br />
									WITH <span className="text-accent">EASE</span>
								</h1>
								<h3 className="font-secondary text-hero-subtitle font-normal leading-[100%]">
									A Navigation App Tailored for Public Utility Vehicles and Commuters.
								</h3>
								<div className="font-secondary mt-4 flex items-center justify-start gap-16 text-[1.25rem] font-medium">
									<Button variant="solid" type="button">
										<Link href="/map">Try Now</Link>
									</Button>
									<Button variant="outline" type="button">
										<Link href="#aboutUs">About Us</Link>
									</Button>
								</div>
							</div>
							<div className="flex flex-1 items-center justify-center">
								<Image
									src="/images/hero-bg.png"
									alt="Hero Picture"
									width={100}
									height={100}
									className="h-auto w-full object-contain"
									unoptimized={true}
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
			<section className="bg-gray pb-32 pt-16">
				<div className="m-auto flex h-full w-3/4 flex-col items-center justify-center gap-48">
					<div className="flex items-center justify-center">
						<Image
							src="/images/parapo-example1.png"
							alt="Software Sample Picture"
							width={100}
							height={100}
							className="h-1/2 w-1/2 rounded-lg object-contain shadow-md"
							unoptimized={true}
						/>
					</div>
					<div className="flex w-full flex-col items-center justify-center text-center text-black">
						<h3 className="font-primary text-regular-title font-semibold leading-[140%]" id="aboutUs">
							About Us
						</h3>
						<div className="text-regular-text font-secondary flex flex-col gap-4 leading-[170%]">
							<p>
								ParaPo emerges as a solution to address the common challenge faced by visitors and foreigners in
								unfamiliar cities, where the lack of knowledge about PUV routes can hinder mobility and exploration. By
								providing clear, concise, and user-friendly information about PUV routes, stops, and schedules, ParaPo
								bridges the gap between insider knowledge and outsider navigation, empowering users to navigate urban
								environments with confidence and ease.
							</p>
							<p>
								In essence, ParaPo represents a step towards democratizing access to transportation information,
								promoting inclusivity, and enhancing the overall travel experience for visitors and foreigners in the
								Philippines.
							</p>
						</div>
					</div>
					<div className="flex w-full gap-16">
						<div className="basis-2/5">
							<h3 className="font-primary text-regular-title font-semibold leading-[140%]">Our Catalog</h3>
							<div className="text-regular-text font-secondary flex flex-col gap-4 leading-[170%]">
								<p>
									Beyond just mapping routes, our unique catalog feature lets you explore diverse destinations without
									needing a set endpoint.
								</p>
								<Button variant="solid" type="button" className="w-max">
									<Link href="/catalog">Try Catalog</Link>
								</Button>
							</div>
						</div>
						<div className="basis-3/5">
							<Image
								src="/images/parapo-example2.png"
								alt="Catalog Sample Picture"
								width={100}
								height={100}
								className="h-full w-full rounded-lg object-contain shadow-lg"
								unoptimized={true}
							/>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
