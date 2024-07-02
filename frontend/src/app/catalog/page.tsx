'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/_components/semantics/Navbar";
import Footer from "@/_components/semantics/Footer";
import Link from "next/link";

import { useEffect, useState } from "react";

interface Route {
	id: number;
	routeName: string;
	category: string;
	minFare: number;
	locations: {
		id: number;
		latitude: number;
		longitude: number;
		routeId: number;
	}[];
}

export default function Catalog() {
	// Initialize the state of routes
	const [routes, setRoutes] = useState([] as Route[]);
	
	useEffect(() => {
		(async () => {
			// Fetch routes from the Backend using API Endpoints
			const res = await fetch(`https://localhost:7192/api/routes`);
			const data = await res.json();

			setRoutes(data);
		})();
	}, []);

	async function searchRoutes(e: any) {
		e.preventDefault();
		const search = e.target.elements.routeSearch.value;

		if (search === "") {
			const res = await fetch(`https://localhost:7192/api/routes`);
			const data = await res.json();

			setRoutes(data);
		} else {
	
			const res = await fetch(`https://localhost:7192/api/routes/search?keyword=${search}`);
			const data = await res.json();

			if (data == "No routes or locations found matching the keyword.") {
				setRoutes([]);
			} else {
				setRoutes(data);	
			}


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
								{/* <tr>
									<td>
										<Link href="/catalog/route/1">
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
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											Balintawak - PUC via Baesa
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											₱13.00
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											17 Stations
										</Link>
									</td>
								</tr> */}

								<tr>
									<td>
										<Link href="/catalog/route/1">
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
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											Buendia-MOA
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											₱13.00
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											13 Stations
										</Link>
									</td>
								</tr>

								<tr>
									<td>
										<Link href="/catalog/route/1">
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
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											Gate 5 - Greenhills Shopping Center Loop
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											₱13.00
										</Link>
									</td>
									<td>
										<Link href="/catalog/route/1">
											3 Stations
										</Link>
									</td>
								</tr>


								{/* Don't touch this */}
								{(routes.length != 0) ? (
									routes.map((route) => {
										return (
											<tr key={route.id}>
												<td>
													<Link
														href={`/catalog/route/${route.id}`}
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
														href={`/catalog/route/${route.id}`}
													>
														{route.routeName}
													</Link>
												</td>
												<td>
													<Link
														href={`/catalog/route/${route.id}`}
													>
														₱
														{route.minFare.toFixed(
															2
														)}
													</Link>
												</td>
												<td>
													<Link
														href={`/catalog/route/${route.id}`}
													>
														{route.locations.length}{" "}
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
