"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/_components/semantics/Navbar";
import Footer from "@/_components/semantics/Footer";
import Link from "next/link";

import { useEffect, useState } from "react";

interface Route {
	route_id: number;
	route_name: string;
	category: string;
	minFare: number;
	Locations: {
		location_id: number;
		latitude: number;
		longitude: number;
	}[];
}

export default function Catalog() {
	// Initialize the state of routes
	const [routes, setRoutes] = useState([] as Route[]);

	useEffect(() => {
		(async () => {
			// Fetch routes from the Backend using API Endpoints
			const res = await fetch(`http://localhost:3000/api/get/route`);
			const data = await res.json();
			console.log(data);

			setRoutes(data);
		})();
	}, []);

	async function searchRoutes(e: any) {
		e.preventDefault();
		const search = e.target.elements.routeSearch.value;

		if (search === "") {
			const res = await fetch(`http://localhost:3000/api/get/route`);
			const data = await res.json();

			setRoutes(data);
		} else {
			const res = await fetch(
				`http://localhost:3000/api/get/route/search/${search}`
			);
			const data = await res.json();

			// If no routes are found, set the routes to an empty array
			if (data.message) {
				setRoutes([]);
				return;
			}

			setRoutes(data);
		}
	}

	return (
		<>
			<Navbar />
			<section id={styles.catalogPage}>
				<div className="container mobileContainer">
					<div className={styles.catalogText}>
						<div>
							<h1 className="heroTitleFont mobileHeroTitleFont">
								PARA<span className="main-accent">PO</span>
								<br />
								CATALOG
							</h1>
							<p className="heroSubtitleFont mobileHeroSubtitleFont">
								Our application offers a curated catalog of
								routes tailored for every mode of
								transportation.
							</p>
						</div>
					</div>
					<div className={styles.catalogPic}>
						<Image
							src="images/parapo-example3.png"
							alt="Catalog Picture"
							width={0}
							height={0}
							style={{
								width: "100%",
								height: "auto",
								borderRadius: "1rem",
								boxShadow:
									"10px 10px 10px 5px rgba(0, 0, 0, 0.1)",
							}}
							unoptimized={true}
						/>
					</div>
					<div className={styles.scrollIndicator}>
						<i className="fa-solid fa-chevron-down fa-2xl"></i>
					</div>
				</div>
			</section>
			<section id={styles.catalogList}>
				<div className="container mobileContainer">
					<form action="GET" onSubmit={searchRoutes}>
						<input
							type="text"
							name="routeSearch"
							id="rSearch"
							placeholder="Search Routes"
						/>
					</form>
					<div className={styles.catalogListItems}>
						<table>
							<thead>
								<tr>
									<th>
										<i className="fa-solid fa-car fa-xl"></i>
									</th>
									<th>Route Name</th>
									<th>Price</th>
									<th>Stations</th>
								</tr>
							</thead>
							<tbody>
								{routes.length != 0 ? (
									routes.map((route) => {
										return (
											<tr key={route.route_id}>
												<td>
													<Link
														href={`/catalog/route/${route.route_id}`}
													>
														{route.category ==
														"Jeep" ? (
															<>
																<Image
																	className="fa-xl"
																	src="/images/jeepney-icon.svg"
																	alt="Jeep Icon"
																	width={0}
																	height={0}
																	style={{
																		width: "1.5em",
																		height: "auto",
																	}}
																/>
																<p className="bodyTextFont">
																	Jeep
																</p>
															</>
														) : route.category ==
														  "Bus" ? (
															<>
																<i className="fa-solid fa-bus fa-xl"></i>
																<p className="bodyTextFont">
																	Bus
																</p>
															</>
														) : route.category ==
														  "Train" ? (
															<>
																<i className="fa-solid fa-train fa-xl"></i>
																<p className="bodyTextFont">
																	Train
																</p>
															</>
														) : (
															<>
																<i className="fa-solid fa-question fa-xl"></i>
																<p className="bodyTextFont">
																	Unknown
																</p>
															</>
														)}
													</Link>
												</td>
												<td>
													<Link
														href={`/catalog/route/${route.route_id}`}
													>
														{route.route_name}
													</Link>
												</td>
												<td>
													<Link
														href={`/catalog/route/${route.route_id}`}
													>
														₱
														{route.minFare.toFixed(
															2
														)}
													</Link>
												</td>
												<td>
													<Link
														href={`/catalog/route/${route.route_id}`}
													>
														{route.Locations.length}{" "}
														Stations
													</Link>
												</td>
											</tr>
										);
									})
								) : (
									<tr>
										<td colSpan={4}>
											<p className="bodyTextFont">
												No routes found.
											</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
