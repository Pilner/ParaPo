'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Route } from '@/_types/Models';

import { useGetRoutes, useSearchRoutes } from '@/_hooks/useRoute';

import Navbar from '@/_components/semantics/Navbar';
import Footer from '@/_components/semantics/Footer';
import { TextInput } from '@/_components/Input';

import { toast } from 'react-toastify';

export default function Catalog() {
	// Initialize the state of routes
	const [routes, setRoutes] = useState<Route[]>([]);

	const { data, error } = useGetRoutes();

	useEffect(() => {
		if (error) {
			console.error(error);
			toast.error('An error occurred while fetching the routes');
		}
		if (data) {
			setRoutes(data);
		}
	}, [data, error]);

	const [searchInput, setSearchInput] = useState<string>('');
	const { data: searchData, error: searchError } = useSearchRoutes(searchInput);

	useEffect(() => {
		if (searchError) {
			console.error(searchError);
			toast.error('An error occurred while fetching the routes');
		}
		if (searchData) {
			setRoutes(searchData);
		}
	}, [searchData, searchError]);

	function handleSearch(input: string) {
		if (data) {
			if (input === '' || input === null) {
				setRoutes(data);
			} else {
				setSearchInput(input);
			}
		}
	}

	return (
		<>
			<div className="flex flex-col
			h-full lg:h-screen ">
				<Navbar />
				<section className="
				h-full flex-grow bg-gray
				pt-12 sm:pt-20 md:pt-24 lg:pt-0
				">
					<div className="
					m-auto h-full
					w-[90%] sm:w-[85%] lg:w-[80%] xl:w-[75%]
					">
						<div className="
						flex h-full
						flex-col-reverse lg:flex-row
						gap-8 lg:gap-12 xl:gap-16
						">
							<div className="flex h-full flex-1 flex-col justify-center gap-4 text-black">
								<h1 className="
								font-primary font-bold leading-[90%]
								
								text-base-hero-title sm:text-sm-hero-title md:text-md-hero-title
								lg:text-lg-hero-title xl:text-xl-hero-title 2xl:text-hero-title

								text-center lg:text-left
								">
									PARA<span className="text-accent">PO</span> <br />
									CATALOG
								</h1>
								<h3 className="
								font-secondary font-normal leading-[100%]

								text-base-hero-subtitle sm:text-sm-hero-subtitle md:text-md-hero-subtitle
								lg:text-lg-hero-subtitle xl:text-xl-hero-subtitle 2xl:text-hero-subtitle

								text-center lg:text-left
								">
									Our application offers a curated catalog of routes tailored for every mode of transportation.
								</h3>
							</div>
							<div className="flex flex-1 items-center justify-center">
								<Image
									src="images/parapo-example3.png"
									alt="Catalog Picture"
									width={100}
									height={100}
									className="
									overflow-hidden rounded-lg object-contain drop-shadow-lg
									h-[80%] lg:h-full
									w-[80%] lg:w-full
									"
									unoptimized={true}
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
			<section className="bg-gray pb-16
			pt-12 sm:pt-20 md:pt-24 lg:pt-12 xl:pt-16
			">
				<div className="m-auto h-full
				w-[90%] sm:w-[85%] lg:w-[80%] xl:w-[75%]
				">
					<form className="
					text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text
					lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text
					">
						<TextInput placeholder="Search Routes" onChange={handleSearch} />
					</form>
					<table className="
					mt-4 w-full border-separate border-spacing-y-4 gap-4
					
					text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text
					lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text
					">
						<thead className="bg-accent text-white
						hidden lg:table-header-group">
							<tr>
								<th className="rounded-l-lg py-2">
									<i className="fa-solid fa-car fa-xl"></i>
								</th>
								<th className="py-2">Route Name</th>
								<th className="py-2">Price</th>
								<th className="rounded-r-lg py-2">Stations</th>
							</tr>
						</thead>
						<tbody className="text-center">
							{routes && routes.length > 0 ? (
								routes.map((route, index) => (
									<Link href={`/catalog/route/${route.route_id}`} className="contents">
										<tr
											key={`routeList-row-${index}`}
											className="duration-20 bg-dark-gray transition hover:bg-[#CCCCCC]"
										>
											<td className="rounded-l-lg py-2 align-middle
											pl-[1rem] lg:pl-[0rem]
											">
												<div className="flex flex-col items-center justify-center">
													{route.category === 'Jeep' ? (
														<Image
															className="fa-sm h-[1.5rem] w-auto"
															src="/images/jeepney-icon.svg"
															alt="Jeep Icon"
															width={100}
															height={100}
														/>
													) : (
														<i
															className={`fa-solid fa-sm p-2 ${route.category == 'Bus' ? 'fa-bus' : route.category == 'Train' ? 'fa-train' : 'fa-question'}`}
														></i>
													)}
													<p>{route.category ?? 'Unknown'}</p>
												</div>
											</td>
											<td className="py-2 align-middle hidden lg:table-cell">{route.route_name}</td>
											<td className="py-2 align-middle hidden lg:table-cell">₱{route.min_fare.toFixed(2)}</td>
											<td className="rounded-r-lg py-2 align-middle hidden lg:table-cell">{route.Locations.length} Stations</td>
											
											<td className="py-2 align-middle flex flex-col pr-[2rem] pl-[1rem] text-left gap-1
											lg:hidden">
												<span>{route.route_name}</span>
												<span>₱{route.min_fare.toFixed(2)}</span>
												<span>{route.Locations.length} Stations</span>
											</td>
										</tr>
									</Link>
								))
							) : (
								<tr className="bg-dark-gray">
									<td colSpan={4} className="rounded-lg py-2">
										No Routes Found
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</section>
			<Footer />
		</>
	);
}
