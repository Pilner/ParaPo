'use client';
import { mapboxAccessToken } from '@/_data/data';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { Location } from '@/_types/Map';
import { Route } from '@/_types/Models';

import { MapboxSearchBox } from '@mapbox/search-js-web';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { fetchLocationName } from '@/_utils/map';

import Button from '@/_components/Button';
import { TextInput, DropdownInput } from '@/_components/Input';
import { MapAdminNavbar } from '@/_components/semantics/Navbar';

import { routeCategoryOptions } from '@/_data/data';
import { validateRouteSchema } from '@/_validation/routeSchema';

import { useGetRoute, usePutRoute } from '@/_hooks/useRoute';
import { toast } from 'react-toastify';

let map: any;

interface LocationList {
	location: Location;
	marker: any;
}

export default function EditRouteMap() {
	const { route_id } = useParams();
	const [locationsList, setLocationsList] = useState<LocationList[]>([]);
	const [inputError, setInputError] = useState<Record<string, string> | null>(null);
	const [showModal, setShowModal] = useState<boolean>(true);

	const [route, setRoute] = useState<Route | null>(null);

	const { data, error } = useGetRoute(Array.isArray(route_id) ? route_id[0] : route_id);
	const { mutate: updateRoute } = usePutRoute(Array.isArray(route_id) ? route_id[0] : route_id);

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

		// cleanup
		return () => {
			map.remove();
		};
	}, []);

	useEffect(() => {
		console.log(locationsList);
	}, [locationsList]);

	useEffect(() => {
		if (error) {
			toast.error('Error fetching route');
		}

		if (data) {
			setRoute(data);

			data.Locations.forEach((location: Location, index: number) => {
				const marker = new mapboxgl.Marker({
					color: '#FF9270',
					draggable: true,
				})
					.setLngLat([location.longitude!, location.latitude!])
					.addTo(map);

				// const newLocationIndex = locationsList.length + 1;

				const popup = new mapboxgl.Popup({
					offset: 25,
					closeOnClick: true,
				}).setText(`Location ${index + 1}: ${location.location_name}`);

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
					// popup.setText(`Location ${newLocationIndex}: ${newLocationName}`);
				});

				marker.setPopup(popup);

				setLocationsList((prevLocationsList) => [
					...prevLocationsList,
					{
						location: {
							location_id: location.location_id,
							location_name: location.location_name,
							longitude: location.longitude,
							latitude: location.latitude,
						},
						marker: marker,
					},
				]);
			});

			// if (data.Locations.length > 0), jump to the middle of the route
			if (data.Locations.length > 0) {
				map.flyTo({
					center: [
						(data.Locations[0].longitude + data.Locations[data.Locations.length - 1].longitude) / 2,
						(data.Locations[0].latitude + data.Locations[data.Locations.length - 1].latitude) / 2,
					],
				});
			}
		}
	}, [data, error]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);
		const Locations = locationsList.map((location) => location.location);

		const payload: any = {
			route_id: route?.route_id,
			route_name: data.get('route_name') as string,
			category: data.get('category') as string,
			min_fare: Number(data.get('min_fare')) || undefined,
			Locations: Locations,
		};
		console.log(payload);

		const errors = await validateRouteSchema(payload);
		if (errors) {
			setInputError(errors);
			console.error(errors);
			return;
		} else {
			setInputError(null);
		}

		updateRoute(payload, {
			onSuccess: () => {
				toast.success('Route edited successfully', {
					onClose: () => {
						// router.push('/admin');
						window.location.href = '/admin';
					},
					autoClose: 1000,
				});
			},
			onError: (error) => {
				toast.error(error.message);
				console.error('Error adding route:', error);
				throw new Error(error.message);
			},
		});
	};

	const deleteLocation = (index: number) => {
		const marker = locationsList[index].marker;
		marker.remove();
		setLocationsList((prevLocationsList) => prevLocationsList.filter((location, i) => i !== index));
	};

	return (
		<main className="relative h-screen w-full">
			{route?.route_id && (
				<div
					className={`absolute bottom-0 left-1/2 z-10 flex max-h-[20rem] w-full -translate-x-1/2 transform flex-col overflow-hidden rounded-lg border border-black/25 bg-white transition duration-500 sm:max-h-[25rem] sm:w-[35rem] md:max-h-[20rem] lg:bottom-auto lg:left-0 lg:max-h-[40rem] lg:w-[25rem] lg:translate-x-5 lg:translate-y-5 ${
						showModal ? 'opacity-100' : 'opacity-75 hover:opacity-100'
					}`}
				>
					<MapAdminNavbar onClick={() => setShowModal(!showModal)} />
					{showModal && (
						<form
							onSubmit={handleSubmit}
							className="flex h-full flex-grow flex-col gap-4 overflow-y-scroll p-4 text-black"
						>
							<div
								id="formSubmit"
								className="flex flex-col gap-2 text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text"
							>
								<TextInput
									label="Route Name"
									name="route_name"
									defaultValue={route?.route_name}
									placeholder="Enter Route Name"
									error={inputError?.route_name || undefined}
									onChange={() => {}}
								/>
								<DropdownInput
									label="Category"
									name="category"
									options={routeCategoryOptions}
									defaultValue={route?.category}
									placeholder="Enter Category"
									error={inputError?.category || undefined}
									onChange={() => {}}
								/>
								<TextInput
									label="Minimum Fare"
									name="min_fare"
									defaultValue={route?.min_fare}
									placeholder="Enter Minimum Fare"
									error={inputError?.min_fare || undefined}
									onChange={() => {}}
								/>
							</div>
							<div className="w-full border border-black/25" />
							<div className="flex min-h-max flex-col gap-2 overflow-y-hidden lg:min-h-full">
								<h3 className="text-center text-regular-text font-bold">Stations List</h3>
								<div className="flex max-h-[10rem] w-full overflow-y-scroll bg-dark-gray p-2 lg:h-full">
									{locationsList.length > 0 ? (
										<ol className="w-full list-outside list-decimal pl-7 text-[1rem]">
											{locationsList.map((location, index) => (
												<li key={index} className="w-full">
													<div className="flex w-full items-center justify-between">
														<p>{location.location.location_name}</p>
														<button type="button" onClick={() => deleteLocation(index)}>
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
							<Button type="submit">Edit Route</Button>
						</form>
					)}
				</div>
			)}
			<div id="map" className="z-0 h-full w-full" />
		</main>
	);
}
