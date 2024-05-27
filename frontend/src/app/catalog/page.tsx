'use client'

import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import Navbar from "@/_components/semantics/Navbar";
import Footer, {AltFooter} from "@/_components/semantics/Footer";
import Button, {AltButton} from "@/_components/Button";
import Line from "@/_components/Line";

import { useEffect, useState } from "react";

export default function Catalog() {

	// Initialize the state of routes
	const [routes, setRoutes] = useState([
		{
			id: 0,
			routeName: "",
			minFare: 0,
			locations: [
				{
					id: 0,
					latitude: 0,
					longitude: 0,
					routeId: 0
				}
			],
		},
	]);

	useEffect(() => {
		(async () => {
			// Fetch routes from the Backend using API Endpoints
			const res = await fetch(`https://localhost:7192/api/routes`);
			const data = await res.json();

			setRoutes(data);
		})();
	}, []);

    return (
		<>
			<section id={styles.catalogPage}>
				<div className="container">
					<Navbar />
					<div id={styles.catalog}>
						<div>
							<div className={styles.catalogLeft}>
								<h1 className="hero-title">
									PARA<span className="orange">PO</span>
								</h1>
								<p className="hero-text">Map Catalog</p>
							</div>
							<div className={styles.catalogRight}>
								<p className="hero-text">
									Beyond just mapping routes, our
									<br />
									unique catalog feature lets you
									<br />
									explore diverse destinations
									<br />
									without needing a set endpoint.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className={styles.transition1}></div>
			<section id={styles.catalogList}>
				<div className="container">
					<div>
						<div className={styles.searchDiv}>
							<input
								className="body-title"
								type="text"
								placeholder="Routes"
							/>
						</div>
						<div className={styles.catalogListItems}>

							{routes.map((route, index) => (
								<Link href={`/catalog/route/${route.id}`}>
									<div>
										<div className={styles.routeId}>
											<p className="section-title">{route.id}</p>
										</div>
										<div className={styles.routeName}>
											<p className="body-title">{route.routeName}</p>
										</div>
									</div>
								</Link>
							))}

						</div>
					</div>
				</div>
			</section>
			<AltFooter />
		</>
	);
}
