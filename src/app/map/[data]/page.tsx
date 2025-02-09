'use client';

import React, { useEffect, useState, Fragment } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxSearchBox } from '@mapbox/search-js-web';

import { MapNavbar } from '@/_components/semantics/Navbar';
import { useGetRoutes } from '@/_hooks/useRoute';
import { fetchLocationName, recursiveDrawRoute } from '@/_utils/map';
import { mapboxAccessToken } from '@/_data/data';

import { Route } from '@/_types/Models';
import locationProps from '@/_types/Location';
import DataPoints from '@/_types/DataPoints';
import RouteList from '@/_types/RouteList';

import { toast } from 'react-toastify';

let map: any;

export default function MapPage() {
	const [showModal, setShowModal] = useState<boolean>(true);
	const tabs = ['Route List', 'Instructions'];
	const [activeTab, setActiveTab] = useState('Route List');
	const [location, setLocation] = useState<locationProps | null>(null);
	const [routes, setRoutes] = useState<Route[] | null>(null);
	const [routeList, setRouteList] = useState<RouteList[]>([]);

	const { data: dataUrl } = useParams();
	const { data, error } = useGetRoutes(1, true);

	useEffect(() => {
		// Decode the data from the URL
		const decodedData = decodeURIComponent(dataUrl as string).split(' ');
		const origin = decodedData[0].split(',');
		const dest = decodedData[1].split(',');

		(async () => {
			const originLocation = await fetchLocationName(parseFloat(origin[0]), parseFloat(origin[1]));
			const destLocation = await fetchLocationName(parseFloat(dest[0]), parseFloat(dest[1]));

			setLocation(() => ({
				origin: {
					location_name: originLocation,
					latitude: parseFloat(origin[0]),
					longitude: parseFloat(origin[1]),
				},
				destination: {
					location_name: destLocation,
					latitude: parseFloat(dest[0]),
					longitude: parseFloat(dest[1]),
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

			searchBox.accessToken = mapboxAccessToken;
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
		if (error) {
			console.error(error);
			toast.error('An error occurred while fetching the data');
		}
		if (data) {
			console.log(data);
			setRoutes(data.routes);
		}
	}, [data, error]);

	useEffect(() => {
		if (location) {
			// Origin Marker
			new mapboxgl.Marker({
				color: '#f53636',
				draggable: false,
			})
				.setLngLat([location.origin.longitude!, location.origin.latitude!])
				.addTo(map);

			// Destination Marker
			new mapboxgl.Marker({
				color: '#46a3ff',
				draggable: false,
			})
				.setLngLat([location.destination.longitude!, location.destination.latitude!])
				.addTo(map);
		}
	}, [location, map]);

	useEffect(() => {
		if (routes && location) {
			const dataPoints: DataPoints = {
				origin: {
					latitude: location.origin.latitude!,
					longitude: location.origin.longitude!,
				},
				destination: {
					latitude: location.destination.latitude!,
					longitude: location.destination.longitude!,
				},
			};

			(async () => {
				const routeListData = await recursiveDrawRoute(routes, dataPoints, map);
				console.log('Route List:', routeListData);
				if (routeListData) {
					setRouteList(routeListData as RouteList[]);
				}
			})();
		}
	}, [routes, location]);

	return (
		<main className="relative h-screen w-full">
			<div
				className={`absolute bottom-0 left-1/2 z-10 flex max-h-[20rem] w-full -translate-x-1/2 transform flex-col overflow-hidden rounded-lg border border-black/25 bg-white transition duration-500 sm:max-h-[25rem] sm:w-[35rem] md:max-h-[20rem] lg:bottom-auto lg:left-0 lg:max-h-[40rem] lg:w-[25rem] lg:translate-x-5 lg:translate-y-5 ${
					showModal ? 'opacity-100' : 'opacity-75 hover:opacity-100'
				}`}
			>
				<MapNavbar onClick={() => setShowModal(!showModal)} />
				{showModal && (
					<div className="flex h-full flex-grow flex-col overflow-y-hidden p-4 text-black">
						<div className="flex flex-col gap-2">
							<div>
								<h3 className="text-base-regular-text font-bold sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
									Origin Location
								</h3>
								<p className="text-base-regular-text font-normal sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
									{location && location.origin.location_name}
								</p>
							</div>
							<div>
								<h3 className="text-base-regular-text font-bold sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
									Destination Location
								</h3>
								<p className="text-base-regular-text font-normal sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
									{location && location.destination.location_name}
								</p>
							</div>
						</div>
						<div className="mt-4 w-full border border-black/25" />
						<div className="flex w-full justify-between">
							{tabs.map((tab, index) => (
								<button
									key={`tab-${index}`}
									className={`duration-20 duration-20 flex-1 border-b-2 py-2 text-center font-secondary text-[0.75rem] font-semibold transition sm:text-[0.85rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[1rem] ${
										activeTab === tab ? 'border-black bg-dark-gray' : 'border-transparent hover:bg-dark-gray'
									}`}
									onClick={() => setActiveTab(tab)}
								>
									{tab}
								</button>
							))}
						</div>

						{/* Route List */}
						{activeTab === 'Route List' && (
							<div className="flex h-full flex-col gap-2 overflow-y-hidden">
								<div className="flex h-full w-full overflow-y-scroll rounded-b-lg bg-dark-gray p-2">
									<ol className="w-full list-outside list-decimal pl-7 text-[0.75rem] sm:text-[0.85rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[1rem]">
										{routeList.map((route, index) => (
											<li key={`route-list-${index}`} className="w-full">
												<p className="duration-20 font-semibold underline decoration-transparent transition hover:decoration-black">
													<Link href={`/catalog/route/${route.minRoute.route_id}`}>{route.minRoute.route_name}</Link>
												</p>
											</li>
										))}
									</ol>
								</div>
							</div>
						)}

						{/* Instructions */}
						{activeTab === 'Instructions' && (
							<div className="flex h-full flex-col gap-2 overflow-y-hidden">
								<div className="flex h-full w-full overflow-y-scroll rounded-b-lg bg-dark-gray p-2">
									<ol className="w-full list-outside list-decimal pl-7 text-[0.75rem] sm:text-[0.85rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[1rem]">
										{routeList.map((route, index) => (
											<Fragment key={`route-fragment-${index}`}>
												{index === 0 && (
													<li key={`first-walk-${index}`} className="w-full">
														<div className="flex w-full items-center justify-between">
															<p className="font-normal">{`First walk to ${routeList[index].minRoute.route_name} Route`}</p>
														</div>
													</li>
												)}
												<li key={`route-${index}`} className="w-full">
													<p className="duration-20 font-semibold underline decoration-transparent transition hover:decoration-black">
														<Link href={`/catalog/route/${route.minRoute.route_id}`}>{route.minRoute.route_name}</Link>
													</p>
													<ul className="list-outside list-disc pl-8 text-[0.75rem] sm:text-[0.85rem] md:text-[0.95rem] lg:text-[0.95rem] xl:text-[1rem]">
														<li>{`Enter at ${route.minRoute.Locations[route.bestIndex.origin].location_name}`}</li>
														<li>{`Exit at ${route.minRoute.Locations[route.bestIndex.dest].location_name}`}</li>
													</ul>
												</li>
												{index === routeList.length - 1 ? (
													<li key={`instructions-last-${index}`} className="w-full">
														<div className="flex w-full items-center justify-between">
															<p className="font-normal">
																{`Now walk/commute to ${location && location.destination.location_name}`}
															</p>
														</div>
													</li>
												) : (
													<li key={`instructions-${index}`} className="w-full">
														<div className="flex w-full items-center justify-between">
															<p className="font-normal">
																{`Now walk to ${routeList[index + 1].minRoute.route_name} Route`}
															</p>
														</div>
													</li>
												)}
											</Fragment>
										))}
									</ol>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
			<div id="map" className="z-0 h-full w-full" />
		</main>
	);
}
