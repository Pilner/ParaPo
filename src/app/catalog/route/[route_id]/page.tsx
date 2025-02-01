'use client';
const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import RouteProps from '@/_types/Route';
import { drawRoute } from '@/_utils/map';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapNavbar } from '@/_components/semantics/Navbar';
import { MapboxSearchBox } from '@mapbox/search-js-web';

let map: any;

export default function RoutePage() {
	// Initialize the state of route
	const [route, setRoute] = useState({
		route_id: 0,
		route_name: '',
		category: '',
		min_fare: 0,
		Locations: [],
	} as RouteProps);

	// get dynamic url params
	const { route_id } = useParams();

	useEffect(() => {
		map = new mapboxgl.Map({
			container: 'map',
			accessToken: mapboxAccessToken,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [121.0, 14.603],
			zoom: 12,
		});

		// Fetch route from the Backend using API Endpoints
		(async () => {
			const res = await fetch(`http://localhost:3000/api/get/route/${route_id}`, { cache: 'force-cache' });
			const data = await res.json();

			setRoute(data);
		})();

		if (map) {
			const searchBox = new MapboxSearchBox();

			if (mapboxAccessToken) {
				searchBox.accessToken = mapboxAccessToken;
			} else {
				console.error('Mapbox Access Token is not set');
				alert('Mapbox Access Token is not set');
				return;
			}

			const geolocateControl = new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true,
				},
				trackUserLocation: true,
				showUserHeading: true,
			});
			map.addControl(geolocateControl, 'bottom-right');
			// @ts-ignore // This is a hack to prevent the camera from moving when the geolocate button is clicked
			geolocateControl._updateCamera = () => {};

			map.on('load', () => {
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
			map.on('load', () => {
				drawRoute('walking', route.category === 'Train' ? 'straight' : 'routed', route, map);
			});

			map.flyTo({
				center: [
					(route.Locations[0].longitude + route.Locations[route.Locations.length - 1].longitude) / 2,
					(route.Locations[0].latitude + route.Locations[route.Locations.length - 1].latitude) / 2,
				],
			});
		}
	}, [map, route]);

	return (
		<main className="relative h-screen w-full">
			<div className="absolute z-10 flex max-h-[40rem] w-[25rem] translate-x-5 translate-y-5 flex-col overflow-hidden rounded-lg border border-black/25 bg-white">
				<MapNavbar />
				<div className="flex h-full flex-grow flex-col gap-4 overflow-y-hidden p-4 text-black">
					<div className="flex flex-col gap-2">
						<div>
							<h3 className="text-regular-text font-bold">Route Name</h3>
							<p className="text-regular-text font-normal">{route.route_name}</p>
						</div>
						<div className="flex justify-between">
							<h3 className="text-regular-text font-bold">Route Category</h3>
							<div className="ml-8 flex items-center gap-2">
								<p className="text-regular-text font-normal">{route.category}</p>
								<Image
									className="fa-xl h-[1.5rem] w-auto"
									src={
										route.category == 'Train'
											? '/images/train-icon.svg'
											: route.category == 'Jeep'
												? '/images/jeepney-icon.svg'
												: '/images/bus-icon.svg'
									}
									alt={route.category == 'Train' ? 'Train Icon' : route.category == 'Jeep' ? 'Jeep Icon' : 'Bus Icon'}
									width={100}
									height={100}
								/>
							</div>
						</div>
						<div className="flex justify-between">
							<h3 className="text-regular-text font-bold">Route Minimum Fare</h3>
							<p className="text-regular-text font-normal">₱{route.min_fare.toFixed(2)}</p>
						</div>
					</div>
					<div className="w-full border border-black/25" />
					<div className="flex h-full flex-col gap-2 overflow-y-scroll">
						<h3 className="text-center text-regular-text font-bold">Stations List</h3>
						<ul className="list-outside list-decimal pl-7 text-[1rem]">
							{route.Locations.map((location, index) => (
								<li key={index}>
									<p>{location.location_name}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div id="map" className="z-0 h-full w-full" />
		</main>
	);
}
