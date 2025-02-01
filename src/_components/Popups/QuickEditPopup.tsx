import React from 'react';
import Link from 'next/link';
import { User, Route, Location } from '@/_types/Models';
import { TextInput, DropdownInput } from '@/_components/Input';
import Button from '@/_components/Button';

import { usePutUser, useDeleteUser } from '@/_hooks/useUser';
import { usePutRoute, useDeleteRoute } from '@/_hooks/useRoute';
import { usePutLocation } from '@/_hooks/useLocation';
import { toast } from 'react-toastify';

import { routeCategoryOptions } from '@/_data/data';

interface PopupProps {
	onCancel: () => void;
}

interface QuickEditUserPopupProps extends PopupProps {
	user: User;
}

export function QuickEditUserPopup({ user, onCancel }: QuickEditUserPopupProps) {
	const { mutate: updateUser } = usePutUser(user.user_id);
	const { mutate: deleteUser } = useDeleteUser();

	const handleCancel = () => {
		onCancel();
	};

	const handleDelete = async () => {
		try {
			deleteUser(user.user_id, {
				onSuccess: (data) => {
					toast.success('User deleted successfully');
					console.log(data);
					handleCancel();
				},
				onError: (error) => {
					console.error('Error deleting user:', error);
					throw new Error(error.message);
				},
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to delete user');
		}
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

		try {
			updateUser(payload, {
				onSuccess: (data) => {
					toast.success('User updated successfully');
					console.log(data);
					handleCancel();
				},
				onError: (error) => {
					console.error('Error updating user:', error);
					throw new Error(error.message);
				},
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to update user');
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
						<TextInput label="Username" name="username" defaultValue={user.username} onChange={() => {}} />
						<TextInput
							type="password"
							name="password"
							label="Password"
							placeholder="Enter Password"
							onChange={() => {}}
						/>
						<TextInput
							type="password"
							name="confirmPassword"
							label="Confirm Password"
							placeholder="Confirm Password"
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
			min_fare: data.get('min_fare'),
			Locations: route.Locations,
		};
		console.log(payload);

		try {
			updateRoute(payload, {
				onSuccess: (data) => {
					toast.success('Route updated successfully');
					console.log(data);
					handleCancel();
				},
				onError: (error) => {
					console.error('Error updating route:', error);
					throw new Error(error.message);
				},
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to update route');
		}
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
						<TextInput label="Route Name" name="route_name" defaultValue={route.route_name} onChange={() => {}} />
						<DropdownInput
							label="Category"
							name="category"
							options={routeCategoryOptions}
							defaultValue={route.category}
							onChange={() => {}}
						/>
						<TextInput label="Minimum Fare" name="min_fare" defaultValue={route.min_fare} onChange={() => {}} />
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
			longitude: data.get('longitude'),
			latitude: data.get('latitude'),
		};
		console.log(payload);

		try {
			updateLocation(payload, {
				onSuccess: (data) => {
					toast.success('Location updated successfully');
					console.log(data);
					handleCancel();
				},
				onError: (error) => {
					console.error('Error updating location:', error);
					throw new Error(error.message);
				},
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to update location');
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
							onChange={() => {}}
						/>
						<TextInput label="Longitude" name="longitude" defaultValue={location.longitude} onChange={() => {}} />
						<TextInput label="Latitude" name="latitude" defaultValue={location.latitude} onChange={() => {}} />
						<TextInput
							type="number"
							label="Route ID"
							defaultValue={location.Routes[0].route_id}
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
