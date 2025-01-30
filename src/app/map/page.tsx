"use client";

import { mapboxAccessToken } from "@/_data/data";

import { MapNavbar } from "@/_components/semantics/Navbar";
import { ButtonSubmit } from "@/_components/Button";
import Marker from "@/_components/Marker";
import Line from "@/_components/Line";

import { MapboxSearchBox } from "@mapbox/search-js-web";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

let map: any;

export default function MapPage() {
	let markerOrigin: any, markerDest: any;

	const [mode, setMode] = useState("");
	const modeRef = useRef(mode);
	const [originLocation, setOriginLocation] = useState("");
	const [destLocation, setDestLocation] = useState("");

	const router = useRouter();

	useEffect(() => {
		// Initialize the map from Mapbox
		map = new mapboxgl.Map({
			container: "map",
			accessToken: mapboxAccessToken,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [121.0, 14.603],
			// maxBounds: [120.8617187, 14.488892905, 121.043525416, 14.631678901],
			zoom: 12,
		});

		if (map) {
			// search box with access token
			const searchBox = new MapboxSearchBox();
			if (mapboxAccessToken != "" || mapboxAccessToken != null) {
				searchBox.accessToken = mapboxAccessToken;
			} else {
				console.error("Mapbox Access Token is not set");
				alert("Mapbox Access Token is not set");
			}
			map.addControl(searchBox);

			const geolocateControl = new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
				showUserHeading: true,
			});

			map.addControl(geolocateControl, "bottom-right");

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
						color: "#f53636",
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
						color: "#46a3ff",
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

			map.on("load", () => {
				if (geolocateControl) {
					geolocateControl.trigger();
				}
			});

			return () => map.remove();
		}
	}, []);

	let getDataFromChild = (data: string) => {
		setMode(data);
	};

	useEffect(() => {
		modeRef.current = mode;
	}, [mode]);

	// submit form
	const handleSubmit = (e: any) => {
		e.preventDefault();
		const data = {
			origin: [...originLocation.split(", ")],
			dest: [...destLocation.split(", ")],
		};

		if (originLocation == "" || destLocation == "") {
			alert("Please input both locations");
			return;
		}

		// convert data into url format
		const urlData = encodeURIComponent(
			`${data.origin.join(",")} ${data.dest.join(",")}`
		);

		// go to another page with the route in the url
		router.push(`/map/${urlData}`);
	};

	return (
		<section id={styles.mapPage}>
			<div className={styles.infoMenu}>
				<MapNavbar />
				<div className={styles.infoPart}>
					<div>
						<div className={styles.infoLocations}>
							<form action="GET" onSubmit={handleSubmit}>
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
												required={true}
											/>
											<Marker
												point="origin"
												color="#f53636"
												getDataFromChild={
													getDataFromChild
												}
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
												required={true}
											/>
											<Marker
												point="destination"
												color="#46a3ff"
												getDataFromChild={
													getDataFromChild
												}
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
