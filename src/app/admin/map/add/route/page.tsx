'use client';
import { mapboxAccessToken } from '@/_data/data';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Route, Location } from '@/_types/Map';

import { MapboxSearchBox } from '@mapbox/search-js-web';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { fetchLocationName } from '@/_utils/map';

import Button from '@/_components/Button';
import Marker from '@/_components/Marker';
import { TextInput, DropdownInput } from '@/_components/Input';
import { MapNavbar } from '@/_components/semantics/Navbar';

import { routeCategoryOptions } from '@/_data/data';

import { usePostRoute } from '@/_hooks/useRoute';
import { toast } from 'react-toastify';

let map: any;

interface LocationList {
	location: Location;
	marker: any;
}

export default function AddRouteMap() {
	const router = useRouter();
	const [locationsList, setLocationsList] = useState<LocationList[]>([]);

	const { mutate: addRoute } = usePostRoute();

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
			// @ts-ignore // This is a hack to prevent the camera from moving when the geolocate button is clicked
			geolocateControl._updateCamera = () => {};

			map.on('load', () => {
				if (geolocateControl) {
					geolocateControl.trigger();
				}
			});

			map.on('click', async (e: any) => {
				if (e.originalEvent.target.closest('.mapboxgl-marker')) {
					return;
				}

				const lngLat = e.lngLat;
				const locationName = await fetchLocationName(lngLat.lat, lngLat.lng);
				const marker = new mapboxgl.Marker({
					color: '#FF9270',
					draggable: true,
				})
					.setLngLat(lngLat)
					.addTo(map);

				// Callback function
				setLocationsList((prevLocationsList) => {
					const newLocationIndex = prevLocationsList.length + 1;

					const popup = new mapboxgl.Popup({
						offset: 25,
						closeOnClick: true,
					}).setText(`Location ${newLocationIndex}: ${locationName}`);

					marker.on('dragend', async () => {
						const newLngLat = marker.getLngLat();
						const newLocationName = await fetchLocationName(newLngLat.lat, newLngLat.lng);

						setLocationsList((updatedLocations) =>
							updatedLocations.map((location) => {
								if (location.marker === marker) {
									return {
										location: {
											...location.location,
											longitude: newLngLat.lng,
											latitude: newLngLat.lat,
											location_name: newLocationName,
										},
										marker: marker,
									};
								}
								return location;
							})
						);

						// Update the popup text
						popup.setText(`Location ${newLocationIndex}: ${newLocationName}`);
					});

					marker.setPopup(popup);

					return [
						...prevLocationsList,
						{
							location: {
								location_name: locationName,
								longitude: lngLat.lng,
								latitude: lngLat.lat,
							},
							marker: marker,
						},
					];
				});
			});
		}
	}, []);

	useEffect(() => {
		console.log(locationsList);
	}, [locationsList]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const Locations = locationsList.map((location) => location.location);

		const payload: Route = {
			route_name: data.get('route_name') as string,
			category: data.get('category') as string,
			min_fare: Number(data.get('min_fare')),
			Locations: Locations,
		};

		console.log(payload);

		try {
			addRoute(payload, {
				onSuccess: (data) => {
					toast.success('Route added successfully', {
						onClose: () => {
							router.push('/admin');
						},
					});
					console.log(data);
				},
				onError: (error) => {
					console.error('Error adding route:', error);
					throw new Error(error.message);
				},
			});
		} catch (error) {
			console.error(error);
			toast.error('Error adding route');
		}
	};

	const deleteLocation = (index: number) => {
		const marker = locationsList[index].marker;
		marker.remove();
		setLocationsList((prevLocationsList) => prevLocationsList.filter((location, i) => i !== index));
	};

	return (
		<main className="relative h-screen w-full">
			<div className="absolute z-10 flex max-h-[40rem] w-[25rem] translate-x-5 translate-y-5 flex-col overflow-hidden rounded-lg border border-black/25 bg-white">
				<MapNavbar />
				<form onSubmit={handleSubmit} className="flex h-full flex-grow flex-col gap-4 overflow-y-hidden p-4 text-black">
					<div id="formSubmit" className="flex flex-col gap-2 text-regular-text">
						<TextInput label="Route Name" name="route_name" placeholder="Enter Route Name" onChange={() => {}} />
						<DropdownInput
							label="Category"
							name="category"
							placeholder="Enter Category"
							options={routeCategoryOptions}
							onChange={() => {}}
						/>
						<TextInput label="Minimum Fare" name="min_fare" placeholder="Enter Minimum Fare" onChange={() => {}} />
					</div>
					<div className="w-full border border-black/25" />
					<div className="flex h-full flex-col gap-2 overflow-y-hidden">
						<h3 className="text-center text-regular-text font-bold">Stations List</h3>
						<div className="flex h-full w-full overflow-y-scroll bg-dark-gray p-2">
							{locationsList.length > 0 ? (
								<ol className="w-full list-outside list-decimal pl-7 text-[1rem]">
									{locationsList.map((location, index) => (
										<li key={index} className="w-full">
											<div className="flex w-full items-center justify-between">
												<p>{location.location.location_name}</p>
												<button onClick={() => deleteLocation(index)}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={2}
														stroke="currentColor"
														className="size-6 opacity-50 hover:opacity-100"
													>
														<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>
											</div>
										</li>
									))}
								</ol>
							) : (
								<h3 className="m-auto text-center font-secondary text-[0.75rem] font-normal text-black/50">
									Click anywhere on the map to add locations!
								</h3>
							)}
						</div>
					</div>
					<Button type="submit">Add Route</Button>
				</form>
			</div>
			<div id="map" className="z-0 h-full w-full" />
		</main>
	);
}
