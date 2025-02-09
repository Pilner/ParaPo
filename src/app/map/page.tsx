'use client';
import { mapboxAccessToken } from '@/_data/data';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { MapboxSearchBox } from '@mapbox/search-js-web';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import locationProps from '@/_types/Location';
import { fetchLocationName } from '@/_utils/map';

import Button from '@/_components/Button';
import Marker from '@/_components/Marker';
import { TextInput } from '@/_components/Input';
import { MapNavbar } from '@/_components/semantics/Navbar';

let map: any;

export default function MapPage() {
	const [showModal, setShowModal] = useState<boolean>(true);
	let markerOrigin: any, markerDest: any;

	const [mode, setMode] = useState<'origin' | 'destination' | 'none'>('none');
	const modeRef = useRef(mode);
	const router = useRouter();

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

	useEffect(() => {
		// Initialize the map from Mapbox
		map = new mapboxgl.Map({
			container: 'map',
			accessToken: mapboxAccessToken,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [121.0, 14.603],
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

			// click makes a marker and drag end moves the location
			map.on('click', (e: any) => {
				const lng = e.lngLat.lng;
				const lat = e.lngLat.lat;

				if (modeRef.current === 'origin') {
					if (markerOrigin) {
						console.log(markerOrigin);
						markerOrigin.remove();
					}
					markerOrigin = new mapboxgl.Marker({
						color: '#f53636',
						draggable: true,
					})
						.setLngLat([lng, lat])
						.addTo(map);

					setLocation((prevLocation) => ({
						...prevLocation,
						origin: {
							...prevLocation.origin,
							latitude: lat,
							longitude: lng,
						},
					}));

					markerOrigin.on('dragend', (e: any) => {
						setLocation((prevLocation) => ({
							...prevLocation,
							origin: {
								...prevLocation.origin,
								latitude: e.target._lngLat.lat,
								longitude: e.target._lngLat.lng,
							},
						}));
					});
				} else if (modeRef.current === 'destination') {
					if (markerDest) {
						console.log(markerDest);
						markerDest.remove();
					}
					markerDest = new mapboxgl.Marker({
						color: '#46a3ff',
						draggable: true,
					})
						.setLngLat([lng, lat])
						.addTo(map);

					setLocation((prevLocation) => ({
						...prevLocation,
						destination: {
							...prevLocation.destination,
							latitude: lat,
							longitude: lng,
						},
					}));

					markerDest.on('dragend', (e: any) => {
						setLocation((prevLocation) => ({
							...prevLocation,
							destination: {
								...prevLocation.destination,
								latitude: e.target._lngLat.lat,
								longitude: e.target._lngLat.lng,
							},
						}));
					});
				}
			});

			map.on('load', () => {
				if (geolocateControl) {
					geolocateControl.trigger();
				}
			});

			return () => map.remove();
		}
	}, []);

	useEffect(() => {
		(async () => {
			if (location.origin.latitude && location.origin.longitude) {
				const locationName = await fetchLocationName(location.origin.latitude, location.origin.longitude);

				setLocation((prevLocation) => ({
					...prevLocation,
					origin: {
						...prevLocation.origin,
						location_name: locationName,
					},
				}));
			}
		})();
	}, [location.origin.latitude, location.origin.longitude]);

	useEffect(() => {
		(async () => {
			if (location.destination.latitude && location.destination.longitude) {
				const locationName = await fetchLocationName(location.destination.latitude, location.destination.longitude);

				setLocation((prevLocation) => ({
					...prevLocation,
					destination: {
						...prevLocation.destination,
						location_name: locationName,
					},
				}));
			}
		})();
	}, [location.destination.latitude, location.destination.longitude]);

	useEffect(() => {
		modeRef.current = mode;
	}, [mode]);

	let getDataFromChild = (data: 'origin' | 'destination' | 'none') => {
		setMode(data);
	};

	// submit form
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log(location);

		if (
			!location.origin.latitude ||
			!location.origin.longitude ||
			!location.destination.latitude ||
			!location.destination.longitude
		) {
			alert('Please input both locations');
			return;
		}

		const data = {
			origin: [location.origin.latitude, location.origin.longitude],
			dest: [location.destination.latitude, location.destination.longitude],
		};

		// convert data into url format
		const urlData = encodeURIComponent(`${data.origin.join(',')} ${data.dest.join(',')}`);

		// go to another page with the route in the url
		router.push(`/map/${urlData}`);
	};

	return (
		<main className="relative h-screen w-full">
			<div
				className={`absolute bottom-0 left-1/2 z-10 flex max-h-[20rem] w-full -translate-x-1/2 transform flex-col overflow-hidden rounded-lg border border-black/25 bg-white transition duration-500 sm:max-h-[25rem] sm:w-[35rem] md:max-h-[20rem] lg:bottom-auto lg:left-0 lg:max-h-[40rem] lg:w-[25rem] lg:translate-x-5 lg:translate-y-5 ${
					showModal ? 'opacity-100' : 'opacity-75 hover:opacity-100'
				}`}
			>
				<MapNavbar onClick={() => setShowModal(!showModal)} />
				{showModal && (
					<div className="flex h-full flex-grow flex-col gap-4 overflow-y-scroll p-4 text-black">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col gap-2 text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text"
						>
							<div className="flex gap-4">
								<TextInput
									name="originCoords"
									value={
										location.origin.latitude && location.origin.longitude
											? `${location.origin.latitude},${location.origin.longitude}`
											: ''
									}
									placeholder="Click the Marker!"
									readOnly={true}
								>
									<span>
										<i className="fa-solid fa-location-dot"></i>
									</span>{' '}
									Origin
								</TextInput>
								<div className="self-end">
									<Marker
										point="origin"
										color="#f53636"
										getDataFromChild={getDataFromChild}
										className={mode === 'origin' ? 'cursor-default bg-[rgba(0,0,0,0.5)]' : ''}
									/>
								</div>
							</div>
							<div className="flex gap-4">
								<TextInput
									name="destCoords"
									value={
										location.destination.latitude && location.destination.longitude
											? `${location.destination.latitude},${location.destination.longitude}`
											: ''
									}
									placeholder="Click the Marker!"
									readOnly={true}
								>
									<span>
										<i className="fa-solid fa-location-dot"></i>
									</span>{' '}
									Destination
								</TextInput>
								<div className="self-end">
									<Marker
										point="destination"
										color="#46a3ff"
										getDataFromChild={getDataFromChild}
										className={mode === 'destination' ? 'cursor-default bg-[rgba(0,0,0,0.5)]' : ''}
									/>
								</div>
							</div>
							<div className="mt-4">
								<Button
									type="submit"
									className="w-full"
									disabled={
										!location.origin.latitude ||
										!location.origin.longitude ||
										!location.destination.latitude ||
										!location.destination.longitude
									}
								>
									Search
								</Button>
							</div>
						</form>
						{(location.origin.location_name || location.destination.location_name) && (
							<>
								<div className="w-full border border-black/25" />
								<div className="flex flex-col gap-2">
									<div>
										<h3 className="text-base-regular-text font-bold sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
											Origin Location
										</h3>
										<p className="text-base-regular-text font-normal sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
											{location.origin.location_name}
										</p>
									</div>
									<div>
										<h3 className="text-base-regular-text font-bold sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
											Destination Location
										</h3>
										<p className="text-base-regular-text font-normal sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
											{location.destination.location_name}
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				)}
			</div>
			<div id="map" className="z-0 h-full w-full" />
		</main>
	);
}
