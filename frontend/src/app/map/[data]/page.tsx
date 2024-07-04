"use client";
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

import { MapNavbar } from "@/_components/semantics/Navbar";
import { MapboxSearchBox } from "@mapbox/search-js-web";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./page.module.css";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

let map: any;

interface Route {
	id: number;
	routeName: string;
	category: string;
	minFare: number;
	locations: {
		id: number;
		locationName: string;
		latitude: string;
		longitude: string;
		routeId: number;
	}[];
}

interface dataPointsProps {
	origin: number[];
	dest: number[];
}

export default function MapPage() {
	let markerOrigin: any, markerDest: any;
	let center: [number, number];

	const [mode, setMode] = useState("");
	const modeRef = useRef(mode);
	const [dataPoints, setDataPoints] = useState({} as dataPointsProps);
	const [locationNames, setLocationNames] = useState([] as string[]);

	const [routes, setRoutes] = useState([] as Route[]);

	const router = useRouter();
	const { data } = useParams();

	useEffect(() => {
		const temp = decodeURIComponent(data as string).split(" ");
		// console.log(temp);
		let originTemp = temp[0].split(",");
		let destTemp = temp[1].split(",");
		
		setDataPoints({
			origin: [parseFloat(originTemp[0]), parseFloat(originTemp[1])],
			dest: [parseFloat(destTemp[0]), parseFloat(destTemp[1])]
		});
		
	}, []);
	
	useEffect(() => {
		if (dataPoints.origin && dataPoints.dest) {
			(async () => {
				const originGet = await fetch(
					`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${dataPoints.origin[1]}&latitude=${dataPoints.origin[0]}&access_token=${mapboxAccessToken}`
				);
				const originData = await originGet.json();

				const destGet = await fetch(
					`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${dataPoints.dest[1]}&latitude=${dataPoints.dest[0]}&access_token=${mapboxAccessToken}`
				);
				const destData = await destGet.json();

				setLocationNames([
					originData.features[0].properties.name,
					destData.features[0].properties.name,
				]);
			})();
		}
	}, [dataPoints]);	
	
	useEffect(() => {
		// Initialize the map from Mapbox
		map = new mapboxgl.Map({
			container: "map",
			accessToken: mapboxAccessToken,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [121.056, 14.582],
			maxBounds: [
				120.7617187,
                14.386892905,
                121.053525416,
                14.691678901
			],
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

		// make a marker and add to the map
		if (dataPoints.origin && dataPoints.dest) {
			markerOrigin = new mapboxgl.Marker({
				color: "#f53636",
				draggable: false,
			})
				.setLngLat([dataPoints.origin[1], dataPoints.origin[0]])
				.addTo(map);
	
			markerDest = new mapboxgl.Marker({
				color: "#46a3ff",
				draggable: false,
			})
				.setLngLat([dataPoints.dest[1], dataPoints.dest[0]])
				.addTo(map);
		}		
	}, [dataPoints]);

	useEffect(() => {
		(async () => {
			// Fetch routes from the Backend using API Endpoints
			const res = await fetch(`https://localhost:7192/api/routes`);
			const data = await res.json();

			setRoutes(data);
		})();

		if (dataPoints.origin && dataPoints.dest) {
			map.on("load", async () => {
				if (dataPoints.origin && dataPoints.dest) {
					await findRoutes(dataPoints, routes);
				}
			});
		}
	}, [dataPoints, routes]);
		
	return (
		<section id={styles.mapPage}>
			<div className={styles.infoMenu}>
				<MapNavbar />
				<div className={styles.infoPart}>
					<div>
						<div className={styles.infoMeta}>
							<div>
								<p className="bodyTextFont">
									<b>Origin:</b> {locationNames[0]}
								</p>
								<p className="bodyTextFont">
									<b>Destination:</b> {locationNames[1]}
								</p>
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
async function getRoutedWalkingLine(source: number[], destination: number[]) {
	const lineUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${source.join(
		","
	)};${destination.join(",")}?access_token=${mapboxAccessToken}`;
	const response = await fetch(lineUrl);
	const data = await response.json();
	return data;
}

async function drawRoutedLine(routes: any) {
	
	if (routes && routes.locations) {
		// Store only the locations of the route
		let newRoutes = [...routes.locations];

		// For each location, draw a marker and a line to the next location
			newRoutes.forEach(async (route: any, index: any) => {
				// add markers to each location
				let marker, coordinates;
				coordinates = [route.longitude, route.latitude];

				// Create a popup for each location
				const popup = new mapboxgl.Popup({
					offset: 25,
					closeOnClick: true,
				}).setText(`Location ${index + 1}: ${route.locationName}
				${route.latitude}, ${route.longitude}
					
					`);

				// Add a marker to the map
				marker = new mapboxgl.Marker({
					color: "#FF9270",
					draggable: false,
				});
				marker
					.setLngLat([coordinates[0], coordinates[1]])
					.addTo(map)
					.setPopup(popup);

				// Per iteration, fetch the route data between two points
				if (index < newRoutes.length - 1) {
					const data = await getRoutedLine(
						[route.longitude, route.latitude],
						[newRoutes[index + 1].longitude, newRoutes[index + 1].latitude]
					);


					if (data && data.routes) {
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
									"line-color": "#FF9270",
									"line-width": 5,
								},
							});
						}
					}
				}

				//  Return Condition
				if (index === newRoutes.length - 1) {
					return;
				}
			});
	}
}

async function drawRoutedLineTwoPoints(point: number[], route: Route, index: number) {
	if (route && route.locations) {
		let coordinates;
		coordinates = [point[0], point[1]];

		const data = await getRoutedWalkingLine(
			[point[1], point[0]],
			[
				parseFloat(route.locations[index].longitude),
				parseFloat(route.locations[index].latitude),
			]
		);

		if (data && data.routes) {
			// Decode the polyline shapes from the Mapbox API
			const routeGeometry = data.routes[0].geometry;
			const routedCoords = decodePolyline(routeGeometry);
			
			// Use unique names for each source and layer
			const sourceId = `route-source-point-${index}`;
			const layerId = `route-layer-point-${index}`;
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
							// coordinates: [
							// 	[point[1], point[0]],
							// 	[
							// 		parseFloat(route.locations[index].longitude),
							// 		parseFloat(route.locations[index].latitude),
							// 	],
							// ],
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
						"line-color": "green",
						"line-width": 5,
					},
				});
			}
		}
	}
}

async function findRoutes(dataPoints: dataPointsProps, routes: Route[]) {
	// two pointer (origin, destination) approach to find what routes to take from the backend
	const originLocation = dataPoints.origin;
	const destLocation = dataPoints.dest;

	const nearestRoute = getNearestRoute(routes, originLocation, destLocation);
	
	await drawRoutedLine(nearestRoute.minRoute);
	await drawRoutedLineTwoPoints(originLocation, nearestRoute.minRoute, nearestRoute.originIndex);
	await drawRoutedLineTwoPoints(destLocation, nearestRoute.minRoute, nearestRoute.destIndex);
}

// recursive function to get the route with the nearest points from the origin and destination
function getNearestRoute(routes: Route[], origin: number[], destination: number[]) {
	let minDistance = Infinity;
	let minRoute = {} as Route;
	let originIndex: number = 0;
	let destIndex: number = 0;
	let tempOriginIndex = 0;
	let tempDestIndex = 0;
	
	
	// get the nearest route between the origin and destination
	// also find the nearest point of a route from the origin and destination
	routes.forEach((route) => {
		let minOriginDistance = Infinity;
		let minDestDistance = Infinity;
		tempOriginIndex = 0;
		tempDestIndex = 0;
		route.locations.forEach((location, index) => {
			// get the distance between the origin and the location
			const distanceOrigin = Math.sqrt(
				Math.pow(
					Math.abs(parseFloat(location.latitude) - origin[0]),
					2
				) +
					Math.pow(
						Math.abs(parseFloat(location.longitude) - origin[1]),
						2
					)
			);

			// get the distance between the destination and the location
			const distanceDest = Math.sqrt(
				Math.pow(
					Math.abs(parseFloat(location.latitude) - destination[0]),
					2
				) +
					Math.pow(
						Math.abs(
							parseFloat(location.longitude) - destination[1]
						),
						2
					)
			);

			// get the nearest point of the route from the origin
			if (distanceOrigin < minOriginDistance) {
				minOriginDistance = distanceOrigin;
				tempOriginIndex = index;
				// originIndex = index;
			}

			// get the nearest point of the route from the destination
			if (distanceDest < minDestDistance) {
				minDestDistance = distanceDest;
				tempDestIndex = index;
				// destIndex = index;
			}

		});
		
		const totalDistance = minOriginDistance + minDestDistance;

		
		// get the route with the nearest points from the origin and destination
		if (totalDistance < minDistance) {
			minDistance = totalDistance;
			minRoute = route;
			originIndex = tempOriginIndex;
			destIndex = tempDestIndex;
		}

	});	
	return { minRoute, originIndex, destIndex };
}