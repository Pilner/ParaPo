"use client";
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

import { MapNavbar } from "@/_components/semantics/Navbar";
import { ButtonSubmit } from "@/_components/Button";
import Marker from "@/_components/Marker";
import Line from "@/_components/Line";

import { MapboxSearchBox } from "@mapbox/search-js-web";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./page.module.css";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

let map: any;

export default function MapPage() {
	let markerOrigin: any, markerDest: any;

	const [mode, setMode] = useState("");
	const modeRef = useRef(mode);
	const [originLocation, setOriginLocation] = useState("");
	const [destLocation, setDestLocation] = useState("");

	useEffect(() => {
		// Initialize the map from Mapbox
		map = new mapboxgl.Map({
			container: "map",
			accessToken: mapboxAccessToken,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [121.056, 14.582],
			zoom: 12,
		});

		// search box with access token
		const searchBox = new MapboxSearchBox();
		if (mapboxAccessToken != "" || mapboxAccessToken != null) {
			searchBox.accessToken = mapboxAccessToken;;
		} else {
			console.error("Mapbox Access Token is not set");
			alert("Mapbox Access Token is not set");
		}
		map.addControl(searchBox);
		

		// click makes a marker and drag end moves the location
		map.on("click", (e: any) => {
			const lng = e.lngLat.lng;
			const lat = e.lngLat.lat;

			if (modeRef.current === "origin") {
				if (markerOrigin) {
					console.log(markerOrigin);
					markerOrigin.remove();
				}
				markerOrigin = new mapboxgl.Marker({
					color: "red",
					draggable: true,
				})
					.setLngLat([lng, lat])
					.addTo(map);

				setOriginLocation(`${lat}, ${lng}`);

				markerOrigin.on("dragend", (e: any) => {
					setOriginLocation(
						`${e.target._lngLat.lat}, ${e.target._lngLat.lng}`
					);
				});
			} else if (modeRef.current === "destination") {
				if (markerDest) {
					console.log(markerDest);
					markerDest.remove();
				}
				markerDest = new mapboxgl.Marker({
					color: "blue",
					draggable: true,
				})
					.setLngLat([lng, lat])
					.addTo(map);

				setDestLocation(`${lat}, ${lng}`);

				markerDest.on("dragend", (e: any) => {
					setDestLocation(
						`${e.target._lngLat.lat}, ${e.target._lngLat.lng}`
					);
				});
			}
		});

	}, []);
	
	let getDataFromChild = (data: string) => {	
		setMode(data);
	};

	useEffect(() => {
		modeRef.current = mode;
	}, [mode]);

	return (
		<section id={styles.mapPage}>
			<div className={styles.infoMenu}>
				<MapNavbar />
				<div className={styles.infoPart}>
					<div>
						<div className={styles.infoLocations}>
							<form action="GET">
								<div>
									<div className={styles.originSearch}>
										<label htmlFor="originLocation">
											<span>
												<i className="fa-solid fa-location-dot"></i>
											</span>{" "}
											Origin
										</label>
										<div>
											<input
												type="text"
												name="originLocation"
												id="originLocation"
												readOnly={true}
												value={originLocation}
											/>
											<Marker
												point="origin"
												getDataFromChild={getDataFromChild}
											/>
										</div>
									</div>
									<div>
										<Line />
									</div>
									<div className={styles.destSearch}>
										<label htmlFor="destLocation">
											<span>
												<i className="fa-solid fa-location-dot"></i>
											</span>{" "}
											Destination
										</label>
										<div>
											<input
												type="text"
												name="destLocation"
												id="destLocation"
												readOnly={true}
												value={destLocation}
											/>
											<Marker
												point="destination"
												getDataFromChild={getDataFromChild}
											/>
										</div>
									</div>
								</div>
								<div className={styles.submitDiv}>
									<ButtonSubmit text="Search" />
								</div>
							</form>
						</div>
						<div className={styles.line}>
							<Line />
						</div>
						<div className={styles.infoMeta}>
							<div>
								<p className="bodyTextFont">Origin</p>
								<p className="bodyTextFont">Destination</p>
								<p className="bodyTextFont">
									<span>
										<i className="fa-solid fa-tag fa-xl"></i>
									</span>
									₱13.00/4 km + ₱1.80/1 km
								</p>
								<div>
									<Image
										className="fa-xl"
										src="/images/jeepney-icon.svg"
										alt="Jeep Icon"
										width={0}
										height={0}
										style={{
											width: "auto",
											height: "2rem",
										}}
									/>
									<p className="bodyTextFont">Jeepney</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="map" className={styles.mapPart}></div>
		</section>
	);
}

// Decode the polyline shapes from the Mapbox API
function decodePolyline(encoded: string) {
	const coordinates = [];
	let index = 0,
		len = encoded.length;
	let lat = 0,
		lng = 0;

	while (index < len) {
		let b,
			shift = 0,
			result = 0;
		do {
			b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii and subtract it by 63
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);

		const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
		lat += dlat;

		shift = 0;
		result = 0;
		do {
			b = encoded.charAt(index++).charCodeAt(0) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);

		const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
		lng += dlng;

		coordinates.push([lng * 1e-5, lat * 1e-5]);
	}

	return coordinates;
}

// Fetch the route data between two points
async function getRoutedLine(source: number[], destination: number[]) {
	const lineUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${source.join(
		","
	)};${destination.join(",")}?access_token=${mapboxAccessToken}`;
	const response = await fetch(lineUrl);
	const data = await response.json();
	return data;
}

async function drawRoutedLine(routes: any) {
	// Store only the locations of the route
	let newRoutes = [...routes.locations];

	// For each location, draw a marker and a line to the next location
	newRoutes.forEach(async (route: any, index: any) => {
		//  Return Condition
		if (index === newRoutes.length - 1) {
			return;
		}

		// add markers to each location
		let marker, coordinates;
		coordinates = [route.longitude, route.latitude];

		// Create a popup for each location
		const popup = new mapboxgl.Popup({
			offset: 25,
			closeOnClick: true,
		}).setText(`Location ${index + 1}: ${route.locationName}`);

		// Add a marker to the map
		marker = new mapboxgl.Marker({ color: "red", draggable: false });
		marker
			.setLngLat([coordinates[0], coordinates[1]])
			.addTo(map)
			.setPopup(popup);

		// Per iteration, fetch the route data between two points
		const data = await getRoutedLine(
			[route.longitude, route.latitude],
			[newRoutes[index + 1].longitude, newRoutes[index + 1].latitude]
		);

		// Decode the polyline shapes from the Mapbox API
		const routeGeometry = data.routes[0].geometry;
		const routedCoords = decodePolyline(routeGeometry);

		// Use unique names for each source and layer
		const sourceId = `route-source-${index}`;
		const layerId = `route-layer-${index}`;

		// If the source and layer does not exist, add them to the map
		if (!map.getSource(sourceId)) {
			map.addSource(sourceId, {
				type: "geojson",
				data: {
					type: "Feature",
					geometry: {
						type: "LineString",
						// Routed Lines
						coordinates: routedCoords,

						// Straight Lines
						// coordinates: [ [route.longitude, route.latitude], [newRoutes[index + 1].longitude, newRoutes[index + 1].latitude] ],
					},
				},
			});
		}

		if (!map.getLayer(layerId)) {
			map.addLayer({
				id: layerId,
				type: "line",
				source: sourceId,
				paint: {
					"line-color": "red",
					"line-width": 5,
				},
			});
		}
	});
}

		// // On map load, draw the routes on the map using the Backend Data
		// map.on("load", () => {
		// 	drawRoutedLine(route);
		// });
	// const [route, setRoute] = useState({
	// 	id: 0,
	// 	routeName: "",
	// 	minFare: 0,
	// 	locations: [
	// 		{
	// 			id: 0,
	// 			latitude: 0,
	// 			longitude: 0,
	// 			routeId: 0,
	// 		},
	// 	],
	// });

			// alert(`${originLocation} ${destLocation}`);
			// useEffect(() => {
			// }, [mode]);
	
	
	
