"use client";
import { mapboxAccessToken } from "@/_data/data";
import RouteProps from "@/_types/Route";
import dataPointsProps from "@/_types/DataPoints";
import { recursiveDrawRoute, fetchLocationName } from "@/app/_utils/map";

import { MapNavbar } from "@/_components/semantics/Navbar";
import { MapboxSearchBox } from "@mapbox/search-js-web";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./page.module.css";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

let map: any;

export default function MapPage() {
	let markerOrigin: any, markerDest: any;

	const { data } = useParams();

	const [dataPoints, setDataPoints] = useState<dataPointsProps>(
		{} as dataPointsProps
	);
	const [routes, setRoutes] = useState<RouteProps[]>([] as RouteProps[]);
	const [pointNames, setPointNames] = useState({
		origin: "",
		dest: "",
	} as {
		origin: string;
		dest: string;
	});
	const [routeList, setRouteList] = useState(
		[] as {
			minRoute: RouteProps;
			bestIndex: { origin: number; dest: number };
		}[]
	);

	useEffect(() => {
		// Decode the data from the URL
		const decodedData = decodeURIComponent(data as string).split(" ");
		const origin = decodedData[0].split(",");
		const dest = decodedData[1].split(",");

		setDataPoints({
			origin: {
				latitude: parseFloat(origin[0]),
				longitude: parseFloat(origin[1]),
			},
			dest: {
				latitude: parseFloat(dest[0]),
				longitude: parseFloat(dest[1]),
			},
		});

		// Fetch routes from the Backend using API Endpoints
		(async () => {
			const res = await fetch(`http://localhost:3000/api/get/route`);
			const data = await res.json();

			setRoutes(data);
		})();

		// Fetch the location names
		(async () => {
			const originName = await fetchLocationName(
				parseFloat(origin[0]),
				parseFloat(origin[1])
			);
			const destName = await fetchLocationName(
				parseFloat(dest[0]),
				parseFloat(dest[1])
			);

			setPointNames({
				origin: originName,
				dest: destName,
			});
		})();

		// Initialize the map
		map = new mapboxgl.Map({
			container: "map",
			accessToken: mapboxAccessToken,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [
				(parseFloat(origin[1]) + parseFloat(dest[1])) / 2,
				(parseFloat(origin[0]) + parseFloat(dest[0])) / 2,
			],
			// maxBounds: [120.7617187, 14.386892905, 121.053525416, 14.691678901],
			zoom: 12,
		});
		if (map) {
			const searchBox = new MapboxSearchBox();

			if (mapboxAccessToken != "" || mapboxAccessToken != null) {
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
		console.log(dataPoints);
		if (map && dataPoints.origin && dataPoints.dest) {
			// Add the origin marker
			markerOrigin = new mapboxgl.Marker({
				color: "#f53636",
				draggable: false,
			})
				.setLngLat([
					dataPoints.origin.longitude,
					dataPoints.origin.latitude,
				])
				.addTo(map);

			// Add the destination marker
			markerDest = new mapboxgl.Marker({
				color: "#46a3ff",
				draggable: false,
			})
				.setLngLat([
					dataPoints.dest.longitude,
					dataPoints.dest.latitude,
				])
				.addTo(map);
		}
	}, [dataPoints]);

	useEffect(() => {
		if (routes && dataPoints && dataPoints.origin && dataPoints.dest) {
			(async () => {
				const routeListData = await recursiveDrawRoute(
					routes,
					dataPoints,
					map
				);
				if (routeListData) {
					setRouteList(routeListData);
				}
			})();
		}
	}, [routes, dataPoints]);

	return (
		<section id={styles.mapPage}>
			<div className={styles.infoMenu}>
				<MapNavbar />
				<div className={styles.infoPart}>
					<div>
						<div className={styles.infoMeta}>
							<div className={styles.routeInfo}>
								<div>
									<p className="bodyTitleFont">Origin:</p>
									<p className="bodyTextFont">
										{pointNames.origin}
									</p>
								</div>
								<div>
									<p className="bodyTitleFont">
										Destination:
									</p>
									<p className="bodyTextFont">
										{pointNames.dest}
									</p>
								</div>
								{/* <div>
									<p className="bodyTitleFont">Fare Price</p>
									<p className="bodyTextFont">
										{routeList.map(
											(route, index) =>
												`₱${
													route.minRoute.min_fare
												} * ${Math.abs(
													route.bestIndex.dest -
														route.bestIndex.origin
												)}` +
												(index < routeList.length - 1
													? " + "
													: "") +
												" "
										)}
										= ₱
										{routeList.reduce(
											(acc, route) =>
												acc +
												route.minRoute.min_fare *
													Math.abs(
														route.bestIndex.dest -
															route.bestIndex
																.origin
													),
											0
										)}
									</p>
								</div> */}
							</div>

							{/* <p className="bodyTextFont">
									<b>Origin: </b>
									{pointNames.origin}
								</p>
								<p className="bodyTextFont">
									<b>Destination: </b>
									{pointNames.dest}
								</p>
								<p className="bodyTextFont">
									<span>
										<i className="fa-solid fa-tag fa-xl"></i>
									</span>
									₱13.00/4 km + ₱1.80/1 km
								</p> */}
							<div className={styles.routeList}>
								<p className="bodyTitleFont">Route List</p>

								<ul className={styles.routeCard}>
									{routeList.map((route, index) => (
										<li key={index}>
											<p className="bodyTextFont">
												{`${index + 1}. ${
													route.minRoute.route_name
												}`}
											</p>
											<Image
												className="fa-xl"
												src={
													route.minRoute.category ==
													"Train"
														? "/images/train-icon.svg"
														: route.minRoute
																.category ==
														  "Jeep"
														? "/images/jeepney-icon.svg"
														: "/images/bus-icon.svg"
												}
												alt={`${route.minRoute.category} Icon`}
												width={0}
												height={0}
												style={{
													width: "auto",
													height: "2rem",
												}}
											/>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="map" className={styles.mapPart}></div>
		</section>
	);
}
