import React, { useState } from 'react';
import Link from 'next/link';
import { User, Route, Location } from '@/_types/Models';
import { TextInput, DropdownInput } from '@/_components/Input';
import Button from '@/_components/Button';

import { usePutUser, useDeleteUser } from '@/_hooks/useUser';
import { usePutRoute, useDeleteRoute } from '@/_hooks/useRoute';
import { usePutLocation } from '@/_hooks/useLocation';
import { validateUserSchema } from '@/_validation/userSchema';
import { validateRouteSchema } from '@/_validation/routeSchema';
import { validateLocationSchema } from '@/_validation/locationSchema';

import { toast } from 'react-toastify';

import { routeCategoryOptions } from '@/_data/data';

interface PopupProps {
	onCancel: () => void;
}

interface QuickEditUserPopupProps extends PopupProps {
	user: User;
}

export function QuickEditUserPopup({ user, onCancel }: QuickEditUserPopupProps) {
	const [inputError, setInputError] = useState<Record<string, string> | null>(null);

	const { mutate: updateUser } = usePutUser(user.user_id);
	const { mutate: deleteUser } = useDeleteUser();

	const handleCancel = () => {
		onCancel();
	};

	const handleDelete = async () => {
		deleteUser(user.user_id, {
			onSuccess: (data) => {
				toast.success('User deleted successfully');
				console.log(data);
				handleCancel();
			},
			onError: (error) => {
				toast.error(error.message);
				console.log('Error deleting user:', error);
				throw new Error(error.message);
			},
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
		let payload = {
			user_id: user.user_id,
			username: data.get('username'),
			password: data.get('password'),
			confirmPassword: data.get('confirmPassword'),
		};
		console.log(payload);

		const errors = await validateUserSchema(payload);
		if (errors) {
			setInputError(errors);
			console.error(errors);
			return;
		} else {
			setInputError(null);
		}

		updateUser(payload, {
			onSuccess: (data) => {
				toast.success('User updated successfully');
				console.log(data);
				handleCancel();
			},
			onError: (error) => {
				toast.error(error.message);
				console.error('Error updating user:', error);
				throw new Error(error.message);
			},
		});
	};

	return (
		<>
			<div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
				<form
					onSubmit={handleSubmit}
					className="flex w-full max-w-[50rem] flex-col gap-8 overflow-hidden rounded-lg bg-white p-6 text-black"
				>
					<div className="flex items-center justify-between">
						<h3 className="text-primary text-2xl font-bold">Editing {user.username}</h3>
						<button onClick={handleCancel}>
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
					<div className="flex w-full flex-col gap-4">
						<TextInput
							label="User ID"
							name="user_id"
							readOnly={true}
							disabled={true}
							value={user.user_id}
							onChange={() => {}}
						/>
						<TextInput
							label="Username"
							name="username"
							defaultValue={user.username}
							placeholder="Enter Username"
							error={inputError?.username || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="password"
							name="password"
							label="Password"
							placeholder="Enter Password"
							error={inputError?.password || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="password"
							name="confirmPassword"
							label="Confirm Password"
							placeholder="Confirm Password"
							error={inputError?.confirmPassword || undefined}
							onChange={() => {}}
						/>
					</div>
					<div className="mt-auto flex justify-between">
						<div className="flex gap-8">
							<Button variant="outline" theme="danger" onClick={handleDelete} className="text-primary rounded-lg">
								Delete
							</Button>
						</div>
						<div className="flex gap-8">
							<Button variant="solid" theme="success" type="submit" className="rounded-lg">
								Save
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

interface QuickEditRoutesPopupProps extends PopupProps {
	route: Route;
}

export function QuickEditRoutesPopup({ route, onCancel }: QuickEditRoutesPopupProps) {
	const [inputError, setInputError] = useState<Record<string, string> | null>(null);

	const { mutate: updateRoute } = usePutRoute(route.route_id);
	const { mutate: deleteRoute } = useDeleteRoute();

	const handleCancel = () => {
		onCancel();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
		let payload = {
			route_id: route.route_id,
			route_name: data.get('route_name'),
			category: data.get('category'),
			min_fare: Number(data.get('min_fare')) || undefined,
			Locations: route.Locations,
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
			onSuccess: (data) => {
				toast.success('Route updated successfully');
				console.log(data);
				handleCancel();
			},
			onError: (error) => {
				toast.error(error.message);
				console.error('Error updating route:', error);
				throw new Error(error.message);
			},
		});
	};

	const handleDelete = async () => {
		try {
			deleteRoute(route.route_id, {
				onSuccess: (data) => {
					toast.success('Route deleted successfully');
					console.log(data);
					handleCancel();
				},
				onError: (error) => {
					console.error('Error deleting route:', error);
					throw new Error(error.message);
				},
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete route');
		}
	};

	return (
		<>
			<div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
				<form
					onSubmit={handleSubmit}
					className="flex w-full max-w-[50rem] flex-col gap-8 overflow-hidden rounded-lg bg-white p-6 text-black"
				>
					<div className="flex items-center justify-between">
						<h3 className="text-primary text-2xl font-bold">Editing Route {route.route_id}</h3>
						<button onClick={handleCancel}>
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
					<div className="flex w-full flex-col gap-4">
						<TextInput
							label="Route ID"
							name="route_id"
							readOnly={true}
							disabled={true}
							value={route.route_id}
							onChange={() => {}}
						/>
						<TextInput
							label="Route Name"
							name="route_name"
							defaultValue={route.route_name}
							placeholder="Enter Route Name"
							error={inputError?.route_name || undefined}
							onChange={() => {}}
						/>
						<DropdownInput
							label="Category"
							name="category"
							options={routeCategoryOptions}
							placeholder="Enter Category"
							defaultValue={route.category}
							error={inputError?.category || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="number"
							label="Minimum Fare"
							name="min_fare"
							defaultValue={route.min_fare}
							min={0}
							placeholder="Enter Minimum Fare (PHP)"
							error={inputError?.min_fare || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="number"
							label="Station Count"
							defaultValue={route.Locations.length}
							disabled={true}
							onChange={() => {}}
						/>
					</div>
					<div className="mt-auto flex justify-between">
						<div className="flex gap-8">
							<Button variant="outline" theme="danger" onClick={handleDelete} className="text-primary rounded-lg">
								Delete
							</Button>
						</div>
						<div className="flex gap-8">
							<Button theme="accent" variant="outline" onClick={() => {}} className="rounded-lg">
								<Link href={`/admin/map/edit/route/${route.route_id}`}>Map Edit</Link>
							</Button>
							<Button type="submit" variant="solid" theme="success" onClick={() => {}} className="rounded-lg">
								Save
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

interface QuickEditLocationsPopupProps extends PopupProps {
	location: Location;
}

export function QuickEditLocationsPopup({ location, onCancel }: QuickEditLocationsPopupProps) {
	const [inputError, setInputError] = useState<Record<string, string> | null>(null);

	const { mutate: updateLocation } = usePutLocation(location.location_id);

	const handleCancel = () => {
		onCancel();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
		let payload = {
			location_id: location.location_id,
			location_name: data.get('location_name'),
			longitude: Number(data.get('longitude')) || undefined,
			latitude: Number(data.get('latitude')) || undefined,
		};
		console.log(payload);

		const errors = await validateLocationSchema(payload);
		if (errors) {
			setInputError(errors);
			console.error(errors);
			return;
		} else {
			setInputError(null);
		}

		updateLocation(payload, {
			onSuccess: (data) => {
				toast.success('Location updated successfully');
				console.log(data);
				handleCancel();
			},
			onError: (error) => {
				toast.error(error.message);
				console.error('Error updating location:', error);
				throw new Error(error.message);
			},
		});
	};

	return (
		<>
			<div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
				<form
					onSubmit={handleSubmit}
					className="flex w-full max-w-[50rem] flex-col gap-8 overflow-hidden rounded-lg bg-white p-6 text-black"
				>
					<div className="flex items-center justify-between">
						<h3 className="text-primary text-2xl font-bold">Editing Location {location.location_id}</h3>
						<button onClick={handleCancel}>
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
					<div className="flex w-full flex-col gap-4">
						<TextInput
							label="Location ID"
							name="location_id"
							readOnly={true}
							disabled={true}
							value={location.location_id}
							onChange={() => {}}
						/>
						<TextInput
							label="Location Name"
							name="location_name"
							defaultValue={location.location_name}
							placeholder="Enter Location Name"
							error={inputError?.location_name || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="number"
							step="any"
							label="Longitude"
							name="longitude"
							defaultValue={location.longitude}
							placeholder="Enter Longitude"
							error={inputError?.longitude || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="number"
							step="any"
							label="Latitude"
							name="latitude"
							defaultValue={location.latitude}
							placeholder="Enter Latitude"
							error={inputError?.latitude || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="number"
							label="Route ID"
							value={location.route_id}
							readOnly={true}
							disabled={true}
							onChange={() => {}}
						/>
					</div>
					<div className="mt-auto flex justify-between">
						<div className="flex gap-8"></div>
						<div className="flex gap-8">
							<Button type="submit" variant="solid" theme="success" onClick={() => {}} className="rounded-lg">
								Save
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
