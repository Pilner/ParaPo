'use client'
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

import {MapNavbar} from "@/_components/semantics/Navbar";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/_components/Button";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useParams } from "next/navigation";
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

let map: any;

export default function RoutePage() {
	// Initialize the state of route
	const [route, setRoute] = useState({
		id: 0,
		routeName: "",
		category: "",
		minFare: 0,
		locations: [],
	} as Route);

	// get dynamic url params
	const { id } = useParams();

	useEffect(() => {
		// Fetch route from the Backend using API Endpoints
		(async () => {
			const res = await fetch(`https://localhost:7192/api/routes/${id}`, {cache: "force-cache"});
			const data = await res.json();

			setRoute(data);
		})();
	}, []);

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
		// On map load, draw the routes on the map using the Backend Data
		map.on("load", () => {
			drawRoutedLine(route);
		});
	}, [map]);

  return (
		<section id={styles.routePage}>
			<div className={styles.infoMenu}>
				<MapNavbar />
				<div className={styles.infoPart}>
					<div>
						<h1 className="bodyTitleFont">{route.routeName}</h1>
						<p className="bodyTextFont">
							<span>
								<i className="fa-solid fa-tag fa-xl"></i>
							</span>
							₱{route.minFare.toFixed(2)}/4 km + ₱1.80/1 km
						</p>
						<div>
							<Image
								className="fa-xl"
								src="/images/jeepney-icon.svg"
								alt="Jeep Icon"
								width={0}
								height={0}
								style={{
									width: "2rem",
									height: "auto",
								}}
							/>
							<p className="bodyTextFont">
								{route.category}
							</p>
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
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii and subtract it by 63
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = (result & 1) !== 0 ? ~(result >> 1) : (result >> 1);
    lng += dlng;

    coordinates.push([lng * 1e-5, lat * 1e-5]);
  }

  return coordinates;
}

// Fetch the route data between two points
async function getRoutedLine(source: number[], destination: number[]) {
	const lineUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${source.join(',')};${destination.join(',')}?access_token=${mapboxAccessToken}`;
	const response = await fetch(lineUrl, {cache: "force-cache"});
	const data = await response.json();
	return data;
}

async function drawRoutedLine(routes: any) {

	// Store only the locations of the route
	let newRoutes = [...routes.locations];
	
	// For each location, draw a marker and a line to the next location
	newRoutes.forEach(async (route: any, index: any) => {
		
		// add markers to each location
		let marker, coordinates;
		coordinates = [route.longitude, route.latitude];

		// Create a popup for each location
		const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: true })
			.setText(`Location ${index + 1}: ${route.locationName}`)

		// Add a marker to the map
		if (index === 0 || index === newRoutes.length - 1) {
			marker = new mapboxgl.Marker({
				color: "#f53636",
				draggable: false,
			});
			marker.setLngLat([
				coordinates[0],
				coordinates[1]
			])
				.addTo(map)
				.setPopup(popup)
		} else {
			marker = new mapboxgl.Marker({
				color: "#FF9270",
				draggable: false,
			});
			marker.setLngLat([
				coordinates[0],
				coordinates[1]
			])
				.addTo(map)
				.setPopup(popup)
		}

		//  Return Condition
		if (index === newRoutes.length - 1) {
			return;
		}

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
	})
}