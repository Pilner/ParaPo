'use client';
import { mapboxAccessToken } from '@/_data/data';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import RouteProps from '@/_types/Route';
import locationProps from '@/_types/Location';
import { recursiveDrawRoute, fetchLocationName } from '@/app/_utils/map';

import { MapNavbar } from '@/_components/semantics/Navbar';
import { MapboxSearchBox } from '@mapbox/search-js-web';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useParams } from 'next/navigation';

let map: any;

export default function MapPage() {
	let markerOrigin: any, markerDest: any;

	const { data } = useParams();

	const [location, setLocation] = useState<locationProps>({
		origin: {
			location_name: '',
			latitude: null,
			longitude: null,
		},
		destination: {
			location_name: '',
			latitude: null,
			longitude: null,
		},
	});
	const [routes, setRoutes] = useState<RouteProps[]>([] as RouteProps[]);
	const [routeList, setRouteList] = useState(
		[] as {
			minRoute: RouteProps;
			bestIndex: { origin: number; dest: number };
		}[]
	);

	useEffect(() => {
		// Decode the data from the URL
		const decodedData = decodeURIComponent(data as string).split(' ');
		const origin = decodedData[0].split(',');
		const dest = decodedData[1].split(',');

		setLocation((previousLocation) => ({
			origin: {
				...previousLocation.origin,
				latitude: parseFloat(origin[0]),
				longitude: parseFloat(origin[1]),
			},
			destination: {
				...previousLocation.destination,
				latitude: parseFloat(dest[0]),
				longitude: parseFloat(dest[1]),
			},
		}));

		// Fetch routes from the Backend using API Endpoints
		(async () => {
			const res = await fetch(`http://localhost:3000/api/get/route`);
			const data = await res.json();

			setRoutes(data);
		})();

		// Fetch the location names
		(async () => {
			const originName = await fetchLocationName(parseFloat(origin[0]), parseFloat(origin[1]));
			const destName = await fetchLocationName(parseFloat(dest[0]), parseFloat(dest[1]));

			setLocation((previousLocation) => ({
				origin: {
					...previousLocation.origin,
					location_name: originName,
				},
				destination: {
					...previousLocation.destination,
					location_name: destName,
				},
			}));
		})();

		// Initialize the map
		map = new mapboxgl.Map({
			container: 'map',
			accessToken: mapboxAccessToken,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [(parseFloat(origin[1]) + parseFloat(dest[1])) / 2, (parseFloat(origin[0]) + parseFloat(dest[0])) / 2],
			zoom: 12,
		});

		if (map) {
			const searchBox = new MapboxSearchBox();

			if (mapboxAccessToken != '' || mapboxAccessToken != null) {
				searchBox.accessToken = mapboxAccessToken;
			} else {
				console.error('Mapbox Access Token is not set');
				alert('Mapbox Access Token is not set');
			}
			map.addControl(searchBox);

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
		console.log(location);
		if (map && location.origin && location.destination) {
			// Add the origin marker
			markerOrigin = new mapboxgl.Marker({
				color: '#f53636',
				draggable: false,
			})
				.setLngLat([location.origin.longitude!, location.origin.latitude!])
				.addTo(map);

			// Add the destination marker
			markerDest = new mapboxgl.Marker({
				color: '#46a3ff',
				draggable: false,
			})
				.setLngLat([location.destination.longitude!, location.destination.latitude!])
				.addTo(map);
		}
	}, [location]);

	useEffect(() => {
		if (routes && location && location.origin && location.destination) {
			(async () => {
				const dataPoints = {
					origin: { latitude: location.origin.latitude, longitude: location.origin.longitude },
					dest: { latitude: location.destination.latitude, longitude: location.destination.longitude },
				};

				const routeListData = await recursiveDrawRoute(routes, dataPoints, map);
				if (routeListData) {
					setRouteList(routeListData);
					console.log(routeList);
				}
			})();
		}
	}, [routes, location]);

	return (
		<main className="relative h-screen w-full">
			<div className="absolute z-10 flex max-h-[40rem] w-[25rem] translate-x-5 translate-y-5 flex-col overflow-hidden rounded-lg border border-black/25 bg-white">
				<MapNavbar />
				<div className="flex h-full flex-grow flex-col overflow-y-hidden p-4 text-black">
					<div className="flex flex-col gap-2">
						<div>
							<h3 className="text-regular-text font-bold">Origin Location</h3>
							<p className="text-regular-text font-normal">{location.origin.location_name}</p>
						</div>
						<div>
							<h3 className="text-regular-text font-bold">Destination Location</h3>
							<p className="text-regular-text font-normal">{location.destination.location_name}</p>
						</div>
					</div>
					<div className="mt-4 w-full border border-black/25" />
					<div className="overflow-y-scroll">
						<div className="flex h-full flex-col gap-2">
							<h3 className="text-center text-regular-text font-bold">Route List</h3>
							<ul className="list-outside list-decimal pl-6 text-[1rem]">
								{routeList.map((route, index) => (
									<>
										<li key={`route-list-1-${index}`} className="mb-2">
											<p className="duration-20 font-semibold underline decoration-transparent transition hover:decoration-black">
												<Link href={`/catalog/route/${route.minRoute.route_id}`}>{route.minRoute.route_name}</Link>
											</p>
										</li>
									</>
								))}
							</ul>
						</div>
						<div className="w-full border border-black/25" />
						<div className="flex h-full flex-col gap-2">
							<h3 className="text-center text-regular-text font-bold">Instructions</h3>
							<ul className="list-outside list-decimal pl-6 text-[1rem]">
								{routeList.map((route, index) => (
									<>
										{index === 0 && (
											<li
												key={`route-instructions-2-${index}`}
												className="mb-2"
											>{`First walk to ${routeList[index].minRoute.route_name} Route`}</li>
										)}
										<li key={`route-instructions-1-${index}`} className="mb-2">
											<p className="duration-20 font-semibold underline decoration-transparent transition hover:decoration-black">
												<Link href={`/catalog/route/${route.minRoute.route_id}`}>{route.minRoute.route_name}</Link>
											</p>
											<ul className="list-outside list-disc pl-8 text-[1rem]">
												<li>{`Enter at ${route.minRoute.Locations[route.bestIndex.origin].location_name}`}</li>
												<li>{`Exit at ${route.minRoute.Locations[route.bestIndex.dest].location_name}`}</li>
											</ul>
										</li>
										{index === routeList.length - 1 ? (
											<li>{`Now walk/commute to ${location.destination.location_name}`}</li>
										) : (
											<li
												key={`route-instructions-2-${index}`}
												className="mb-2"
											>{`Now walk to ${routeList[index + 1].minRoute.route_name} Route`}</li>
										)}
									</>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div id="map" className="z-0 h-full w-full" />
		</main>
	);
}
