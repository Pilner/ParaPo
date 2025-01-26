import mapboxgl from "mapbox-gl";

import { mapboxAccessToken } from "@/_data/data";

import dataPointsProps from "@/_types/DataPoints";
import RouteProps from "@/_types/Route";

// roygbiv
const colors = [
	"#FF7F00",
	"#FFCC00",
	"#00FF00",
	"#0000FF",
	"#4B0082",
	"#9400D3",
];
let colorIndex = 0;

// Decode the polyline shapes from the Mapbox API
const decodePolyline = (encoded: string) => {
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
};

export const fetchLocationName = async (
	latitude: number,
	longitude: number
) => {
	const url = await fetch(
		`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${mapboxAccessToken}`
	);

	const data = await url.json();

	return data.features[0].properties.name;
};

// Find the nearest route from the origin and destination points
export const findNearestRoute = async (
	routes: RouteProps[],
	dataPoints: dataPointsProps
) => {
	// get the origin and destination points
	const origin = dataPoints.origin;
	const dest = dataPoints.dest;

	// states
	let minDistance = Infinity;
	let minRoute = {} as RouteProps;
	let bestIndex = {
		origin: 0,
		dest: 0,
	} as { origin: number; dest: number };

	routes.forEach((route) => {
		// Initialize the best distance object
		let distance = {
			origin: Infinity as number,
			dest: Infinity as number,
		} as { origin: number; dest: number };
		let tempBestIndex = {
			origin: 0,
			dest: 0,
		} as { origin: number; dest: number };

		route.Locations.forEach((location, index) => {
			// Get the distance between the origin and the location
			const distanceOrigin = Math.sqrt(
				Math.pow(location.latitude - origin.latitude, 2) +
					Math.pow(location.longitude - origin.longitude, 2)
			);

			// Get the distance between the destination and the location
			const distanceDest = Math.sqrt(
				Math.pow(location.latitude - dest.latitude, 2) +
					Math.pow(location.longitude - dest.longitude, 2)
			);

			// Get the nearest point of the route from the origin
			if (distanceOrigin < distance.origin) {
				distance.origin = distanceOrigin;
				tempBestIndex.origin = index;
			}

			// Get the nearest point of the route from the destination
			if (distanceDest < distance.dest) {
				distance.dest = distanceDest;
				tempBestIndex.dest = index;
			}
		});

		const totalDistance = distance.origin + distance.dest;

		if (totalDistance < minDistance) {
			minDistance = totalDistance;
			minRoute = route;
			bestIndex = tempBestIndex;
		}
	});

	return { minRoute, bestIndex };
};

// Fetch the route from the Mapbox API
const getRoutedLine = async (
	mode: "driving" | "walking" | "cycling",
	origin: number[],
	dest: number[]
) => {
	const lineUrl = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin.join(
		","
	)};${dest.join(",")}?access_token=${mapboxAccessToken}`;

	const response = await fetch(lineUrl);
	const data = await response.json();
	return data;
};

// Draw the route on the map
export async function drawRoute(
	mode: "driving" | "walking" | "cycling",
	type: "straight" | "routed",
	route: RouteProps,
	map: mapboxgl.Map,
	color?: string,
	markerColor?: string
) {
	if (route && route.Locations) {
		route.Locations.forEach(async (location, index) => {
			// Create a popup for each location
			const locationPopup = new mapboxgl.Popup({
				offset: 25,
				closeOnClick: true,
			}).setText(`${route.route_name}
				Location ${index + 1}: ${location.location_name}
				${location.latitude}, ${location.longitude}
				`);

			// Create a marker for each location
			const locationMarker = new mapboxgl.Marker({
				color: markerColor ?? "#FF9270",
				draggable: false,
			})
				.setLngLat([location.longitude, location.latitude])
				.setPopup(locationPopup)
				.addTo(map);

			// Per iteration, draw a line between the current location and the next location
			if (index < route.Locations.length - 1) {
				const data = await getRoutedLine(
					mode,
					[location.longitude, location.latitude],
					[
						route.Locations[index + 1].longitude,
						route.Locations[index + 1].latitude,
					]
				);

				if (data && data.routes) {
					// Decode the polyline shapes
					const coordinates = decodePolyline(data.routes[0].geometry);

					// Use unique names for each source and layer
					const sourceId = `route-source-${data.routes[0].geometry}`;
					const layerId = `route-layer-${data.routes[0].geometry}`;

					// If the source and layer does not exist, add them to the map
					if (!map.getSource(sourceId)) {
						map.addSource(sourceId, {
							type: "geojson",
							data: {
								type: "Feature",
								properties: {},
								geometry: {
									type: "LineString",
									// Routed Lines
									coordinates:
										type === "routed"
											? coordinates
											: [
													[
														location.longitude,
														location.latitude,
													],
													[
														route.Locations[
															index + 1
														].longitude,
														route.Locations[
															index + 1
														].latitude,
													],
											  ],

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
								"line-color": color ?? "#FF9270",
								"line-width": 5,
							},
						});
					}
				}
			}
		});
	}
}

export const drawTwoPoints = async (
	mode: "driving" | "walking" | "cycling",
	type: "straight" | "routed",
	origin: number[],
	dest: number[],
	map: mapboxgl.Map,
	color?: string
) => {
	const data = await getRoutedLine(mode, origin, dest);

	if (data && data.routes) {
		// Decode the polyline shapes
		const coordinates = decodePolyline(data.routes[0].geometry);

		// Use unique names for each source and layer
		const sourceId = `route-source-${origin.join("-")}-${dest.join("-")}`;
		const layerId = `route-layer-${origin.join("-")}-${dest.join("-")}`;

		// If the source and layer does not exist, add them to the map
		if (!map.getSource(sourceId)) {
			map.addSource(sourceId, {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						coordinates:
							type === "routed" ? coordinates : [origin, dest],
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
					"line-color": color ?? "#FF9270",
					"line-width": 5,
				},
			});
		}
	}
};

// Fetch the route from the Mapbox API
const fetchDistance = async (
	mode: "driving" | "walking" | "cycling",
	origin: number[],
	dest: number[]
) => {
	const lineUrl = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${origin.join(
		","
	)};${dest.join(",")}?access_token=${mapboxAccessToken}`;

	const response = await fetch(lineUrl);
	const data = await response.json();

	let minDistance: number = Infinity;

	data.routes.forEach((route: { distance: number; duration: number }) => {
		if (route.distance < minDistance) {
			minDistance = route.distance;
		}
	});

	return minDistance;
};

export const recursiveDrawRoute = async (
	routes: RouteProps[],
	dataPoints: dataPointsProps,
	map: mapboxgl.Map
) => {
	let routeList = [] as {
		minRoute: RouteProps;
		bestIndex: { origin: number; dest: number };
	}[];
	let nearestRoute = await findNearestRoute(routes, dataPoints);

	routeList.push(nearestRoute);

	if (
		nearestRoute &&
		nearestRoute.minRoute &&
		nearestRoute.bestIndex &&
		nearestRoute.bestIndex.origin &&
		nearestRoute.bestIndex.dest
	) {
		await drawTwoPoints(
			"walking",
			"routed",
			[dataPoints.origin.longitude, dataPoints.origin.latitude],
			[
				nearestRoute.minRoute.Locations[nearestRoute.bestIndex.origin]
					.longitude,
				nearestRoute.minRoute.Locations[nearestRoute.bestIndex.origin]
					.latitude,
			],
			map,
			"#f53636"
		);
		await drawRoute("driving", "straight", nearestRoute.minRoute, map);

		// Fetch the distance between the nearest route destination to the actual destination
		while (
			(await fetchDistance(
				"walking",
				[
					nearestRoute.minRoute.Locations[
						nearestRoute.bestIndex.origin
					].longitude,
					nearestRoute.minRoute.Locations[
						nearestRoute.bestIndex.origin
					].latitude,
				],
				[dataPoints.origin.longitude, dataPoints.origin.latitude]
			)) > 500
		) {
			// Find the nearest route from the nearest route destination to the actual destination
			let currentNearestRoute = await findNearestRoute(routes, {
				origin: nearestRoute.minRoute.Locations[
					nearestRoute.bestIndex.dest
				],
				dest: dataPoints.dest,
			});

			// If the nearest route is the same as the previous route, break the loop
			if (
				currentNearestRoute.minRoute.route_id ===
				nearestRoute.minRoute.route_id
			) {
				break;
			}

			await drawRoute(
				"driving",
				"straight",
				currentNearestRoute.minRoute,
				map,
				colors[colorIndex % colors.length],
				colors[colorIndex++ % colors.length]
			);
			await drawTwoPoints(
				"walking",
				"routed",
				[
					nearestRoute.minRoute.Locations[nearestRoute.bestIndex.dest]
						.longitude,
					nearestRoute.minRoute.Locations[nearestRoute.bestIndex.dest]
						.latitude,
				],
				[
					currentNearestRoute.minRoute.Locations[
						currentNearestRoute.bestIndex.origin
					].longitude,
					currentNearestRoute.minRoute.Locations[
						currentNearestRoute.bestIndex.origin
					].latitude,
				],
				map,
				"#f53636"
			);

			// Update the nearest route
			nearestRoute = currentNearestRoute;
			routeList.push(nearestRoute);
		}

		await drawTwoPoints(
			"walking",
			"routed",
			[dataPoints.dest.longitude, dataPoints.dest.latitude],
			[
				nearestRoute.minRoute.Locations[nearestRoute.bestIndex.dest]
					.longitude,
				nearestRoute.minRoute.Locations[nearestRoute.bestIndex.dest]
					.latitude,
			],
			map,
			"#f53636"
		);
		console.log("FINAL Route List:", routeList);

		return routeList;
	}
};
