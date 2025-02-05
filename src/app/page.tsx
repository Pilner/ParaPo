import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '@/_components/semantics/Navbar';
import Footer from '@/_components/semantics/Footer';
import Button from '@/_components/Button';

export default function Home() {
	return (
		<>
			<div className="flex h-auto flex-col lg:h-screen">
				<Navbar />
				<section className="h-full flex-grow bg-gray pt-12 sm:pt-20 md:pt-24 lg:pt-0">
					<div className="m-auto h-full w-[90%] sm:w-[85%] lg:w-[80%] xl:w-[75%]">
						<div className="flex h-full flex-col gap-16 lg:flex-row lg:gap-12 xl:gap-16">
							<div className="flex h-full flex-1 flex-col justify-center gap-1 text-black md:gap-2 lg:gap-1">
								<h1 className="text-base-hero-title sm:text-sm-hero-title md:text-md-hero-title lg:text-lg-hero-title xl:text-xl-hero-title text-center font-primary font-bold leading-[90%] lg:text-left 2xl:text-hero-title">
									NAVIGATE <br />
									WITH <span className="text-accent">EASE</span>
								</h1>
								<h3 className="text-base-hero-subtitle sm:text-sm-hero-subtitle md:text-md-hero-subtitle lg:text-lg-hero-subtitle xl:text-xl-hero-subtitle text-center font-secondary font-normal leading-[100%] lg:text-left 2xl:text-hero-subtitle">
									A Navigation App Tailored for Public Utility Vehicles and Commuters.
								</h3>
								<div className="text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text mt-2 flex flex-row items-center justify-between gap-16 px-[1.5rem] font-secondary font-medium sm:mt-4 sm:px-[4rem] lg:justify-start lg:px-0 xl:text-regular-text">
									<Button variant="solid" type="button">
										<Link href="/map">Try Now</Link>
									</Button>
									<Button variant="outline" type="button">
										<Link href="#aboutUs">About Us</Link>
									</Button>
								</div>
							</div>
							<div className="hidden flex-1 items-center justify-center lg:flex">
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
			<section className="bg-gray pb-32 pt-12 sm:pt-20 md:pt-24 lg:pt-12 xl:pt-16">
				<div className="m-auto flex h-full w-[90%] flex-col items-center justify-center gap-12 sm:w-[85%] sm:gap-20 md:gap-24 lg:w-[80%] lg:gap-24 xl:w-3/4 xl:gap-36 2xl:gap-48">
					<div className="flex items-center justify-center">
						<Image
							src="/images/parapo-example1.png"
							alt="Software Sample Picture"
							width={100}
							height={100}
							className="h-full w-full rounded-lg object-contain shadow-md lg:h-3/4 lg:w-3/4"
							unoptimized={true}
						/>
					</div>
					<div className="flex w-full flex-col items-center justify-center text-center text-black">
						<h3
							className="text-base-regular-title sm:text-sm-regular-title md:text-md-regular-title lg:text-lg-regular-title xl:text-xl-regular-title font-primary font-semibold leading-[140%] 2xl:text-regular-title"
							id="aboutUs"
						>
							About Us
						</h3>
						<div className="text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-reguler-text flex flex-col gap-4 font-secondary leading-[170%]">
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
					<div className="flex w-full flex-col-reverse gap-4 sm:gap-6 md:gap-8 lg:flex-row lg:gap-12 xl:gap-16">
						<div className="basis-2/5">
							<h3 className="text-base-regular-title sm:text-sm-regular-title md:text-md-regular-title lg:text-lg-regular-title xl:text-xl-regular-title text-center font-primary font-semibold leading-[140%] lg:text-left 2xl:text-regular-title">
								Our Catalog
							</h3>
							<div className="text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text flex flex-col gap-4 text-center font-secondary leading-[170%] lg:text-left 2xl:text-regular-text">
								<p>
									Beyond just mapping routes, our unique catalog feature lets you explore diverse destinations without
									needing a set endpoint.
								</p>
								<Button
									variant="solid"
									type="button"
									className="text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text m-auto w-max lg:m-0 2xl:text-regular-text"
								>
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
