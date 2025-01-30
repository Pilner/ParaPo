"use client";
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

import { MapNavbar } from "@/_components/semantics/Navbar";
import { MapboxSearchBox } from "@mapbox/search-js-web";
import Image from "next/image";
import styles from "./page.module.css";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { drawRoute } from "@/app/_utils/map";

interface Route {
	route_id: number;
	route_name: string;
	category: string;
	min_fare: number;
	Locations: {
		location_name: string;
		location_id: number;
		latitude: number;
		longitude: number;
	}[];
}

let map: any;

export default function RoutePage() {
	// Initialize the state of route
	const [route, setRoute] = useState({
		route_id: 0,
		route_name: "",
		category: "",
		min_fare: 0,
		Locations: [],
	} as Route);

	// get dynamic url params
	const { route_id } = useParams();

	useEffect(() => {
		map = new mapboxgl.Map({
			container: "map",
			accessToken: mapboxAccessToken,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [121.0, 14.603],
			zoom: 12,
		});

		// Fetch route from the Backend using API Endpoints
		(async () => {
			const res = await fetch(
				`http://localhost:3000/api/get/route/${route_id}`,
				{ cache: "force-cache" }
			);
			const data = await res.json();

			setRoute(data);
		})();

		if (map) {
			const searchBox = new MapboxSearchBox();

			if (mapboxAccessToken) {
				searchBox.accessToken = mapboxAccessToken;
			} else {
				console.error("Mapbox Access Token is not set");
				alert("Mapbox Access Token is not set");
			}

			const geolocateControl = new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
				showUserHeading: true,
			});
			map.addControl(geolocateControl, "bottom-right");
			// @ts-ignore // This is a hack to prevent the camera from moving when the geolocate button is clicked
			geolocateControl._updateCamera = () => {};

			map.on("load", () => {
				if (geolocateControl) {
					geolocateControl.trigger();
				}
			});
		}

		return () => map.remove();
	}, []);

	useEffect(() => {
		if (route && route.Locations && route.Locations.length > 0) {
			// Initialize the map from Mapbox
			// On map load, draw the routes on the map using the Backend Data
			map.on("load", () => {
				drawRoute("walking", "routed", route, map);
			});

			map.flyTo({
				center: [
					(route.Locations[0].longitude +
						route.Locations[route.Locations.length - 1].longitude) /
						2,
					(route.Locations[0].latitude +
						route.Locations[route.Locations.length - 1].latitude) /
						2,
				],
			});
		}
	}, [map, route]);

	return (
		<section id={styles.routePage}>
			<div className={styles.infoMenu}>
				<MapNavbar />
				<div className={styles.infoPart}>
					<div>
						<h1 className="bodyTitleFont">{route.route_name}</h1>
						<div>
							<Image
								className="fa-xl"
								src={
									route.category == "Train"
										? "/images/train-icon.svg"
										: route.category == "Jeep"
										? "/images/jeepney-icon.svg"
										: "/images/bus-icon.svg"
								}
								alt="Jeep Icon"
								width={0}
								height={0}
								style={{
									width: "2rem",
									height: "auto",
								}}
							/>
							<p className="bodyTextFont">{route.category}</p>
						</div>

						<h1 className="bodyTitleFont">Route List</h1>
						<ul className={styles.routeCard}>
							{route.Locations.map((location, index) => (
								<li key={index}>
									<p className="bodyTextFont">
										{`${index + 1}. ${
											location.location_name
										}`}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div id="map" className={styles.mapPart}></div>
		</section>
	);
}
