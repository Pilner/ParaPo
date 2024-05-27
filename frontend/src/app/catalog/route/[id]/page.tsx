'use client'
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Button, { AltButton } from "@/_components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { faBus, faBusSimple, faWallet } from "@fortawesome/free-solid-svg-icons";

let map: any;

export default function RoutePage() {
	const [route, setRoute] = useState({
		id:0,
		routeName: "",
		minFare: 0,
		locations: [
			{
				id: 0,
				latitude: 0,
				longitude: 0,
				routeId: 0
			}
		]
	});

	// get dynamic url params
	const { id } = useParams();

	useEffect(() => {
		// Fetch route from the Backend using API Endpoints
		(async () => {
			const res = await fetch(`https://localhost:7192/api/routes/${id}`);
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
			zoom: 12,
		});
		// On map load, draw the routes on the map using the Backend Data
		map.on("load", () => {
			drawRoutedLine(route);
		});
	}, [map]);

  return (
		<section id={styles.routePage}>
			<div className={styles.infoPart}>
				<div>
					<div className={styles.navbar}>
						<Link href={"/"}>
							<Image
								src={"/images/TextLogo.svg"}
								alt="logo"
								width={0}
								height={0}
								style={{
									width: "auto",
									height: "100%",
								}}
								unoptimized={true}
							/>
						</Link>
					</div>
					<div className={styles.routeInfo}>
						<div>
							<p className="body-title">{route.routeName}</p>
						</div>
						<div>
							<p className="body-title">
								<span>
									<FontAwesomeIcon icon={faWallet} />
								</span>{" "}
								Minimum Fare/s
							</p>
							<p className="body-title orange">₱15 - ₱18</p>
							<div>
								<div>
									<p className="body-text">
										<span>
										<FontAwesomeIcon icon={faBus} /></span> : {route.minFare} PHP
									</p>
								</div>
								<div>
									<p className="body-text">
										<span>
										<FontAwesomeIcon icon={faBusSimple} /></span> : 18 PHP
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.catalogButton}>
						<div>
							<Button text="Back to Catalog" url="/catalog" />
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
		const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: true })
			.setText(`Location ${index + 1}: ${route.locationName}`)

		// Add a marker to the map
		marker = new mapboxgl.Marker({ color: "red", draggable: false });
		marker.setLngLat([
			coordinates[0],
			coordinates[1]
		])
			.addTo(map)
			.setPopup(popup)
		

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