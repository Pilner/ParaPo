'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetUsers, useSearchUsers } from '@/_hooks/useUser';
import { useGetRoutes, useSearchRoutes } from '@/_hooks/useRoute';
import { useGetLocations, useSearchLocations } from '@/_hooks/useLocation';
import { AuthNavbar } from '@/_components/semantics/Navbar';
import Button from '@/_components/Button';
import { TextInput } from '@/_components/Input';
import Footer from '@/_components/semantics/Footer';
import { User, Route, Location } from '@/_types/Models';

import { toast } from 'react-toastify';

import { AddUserPopup } from '@/_components/Popups/AddPopup';
import { QuickEditUserPopup, QuickEditRoutesPopup, QuickEditLocationsPopup } from '@/_components/Popups/QuickEditPopup';

import { convertDate } from '@/_utils/misc';

type MainTab = 'Routes' | 'Users';
type routeTab = 'Routes' | 'Locations';

export default function AdminPage() {
	const mainTabList: Array<MainTab> = ['Users', 'Routes'];
	const [mainTab, setMainTab] = useState<MainTab>('Users');

	return (
		<section className="flex min-h-screen flex-col">
			<AuthNavbar />
			<div className="flex-grow py-4">
				<div className="m-auto flex h-full w-3/4 flex-col">
					<div className="flex h-[3rem] w-full justify-between border border-[#E4E4E4] bg-[#E4E4E4]">
						<div className="flex">
							{mainTabList.map((tab) => (
								<button
									key={tab}
									className={`px-4 ${mainTab === tab ? 'bg-gray' : 'duration-20 transition hover:backdrop-brightness-105'}`}
									onClick={() => setMainTab(tab)}
								>
									<p
										className={`duration-20 font-primary text-[1rem] transition ${mainTab === tab ? 'font-bold' : 'font-normal'}`}
									>
										{tab}
									</p>
								</button>
							))}
						</div>
						<div className="self-center px-4">
							<h3 className="font-secondary text-[1rem] font-bold text-black">Admin Dashboard</h3>
						</div>
					</div>
					{mainTab === 'Users' && <UsersTab />}
					{mainTab === 'Routes' && <RoutesTab />}
				</div>
			</div>
			<Footer />
		</section>
	);
}

function UsersTab() {
	const [users, setUsers] = useState<User[]>([] as User[]);
	const [currentClickedUser, setCurrentClickedUser] = useState<User | null>(null);
	const [showAddPopup, setShowAddPopup] = useState(false);
	const [showQuickEditPopup, setShowQuickEditPopup] = useState(false);
	const [searchInput, setSearchInput] = useState<string>('');

	const { data, error } = useGetUsers();
	const { data: searchData, error: searchError } = useSearchUsers(searchInput);

	useEffect(() => {
		if (error) {
			toast.error('Failed to fetch data');
		}

		if (data) {
			setUsers(data);
			console.log(data);
		}
	}, [data, error]);

	useEffect(() => {
		if (searchError) {
			console.error(searchError);
			toast.error('An error occurred while fetching the users');
		}
		if (searchData) {
			setUsers(searchData);
		}
	}, [searchData, searchError]);

	useEffect(() => {
		if (showAddPopup || showQuickEditPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [showAddPopup, showQuickEditPopup]);

	function handleSearch(input: string) {
		if (data) {
			if (input === '' || input === null) {
				setUsers(data);
			} else {
				setSearchInput(input);
			}
		}
	}

	return (
		<>
			<div className="my-4 flex flex-col gap-4">
				<div className="font-regular flex justify-between px-2 font-secondary text-[1rem] text-black">
					<div className="w-[20rem]">
						<TextInput placeholder="Search User" onChange={handleSearch} />
					</div>
					<div>
						<Button onClick={() => setShowAddPopup(true)}>+ Add User</Button>
					</div>
				</div>
				<h3 className="px-2 font-secondary text-[1.25rem] font-normal text-black">Total Users: {users.length}</h3>
				<table className="w-full table-fixed border-separate border-spacing-0 border border-[#E4E4E4] font-secondary text-[1rem]">
					<thead className="bg-[#E4E4E4] text-center">
						<tr>
							<th className="w-[2.5%] border-r border-[#E4E4E4] py-2">#</th>
							<th className="w-[10%] py-2">User ID</th>
							<th className="py-2">Username</th>
							<th className="py-2">Password</th>
							<th className="w-[15%] py-2">Date Created</th>
							<th className="w-[15%] py-2">Last Modified</th>
							<th className="w-[5%] py-2"></th>
						</tr>
					</thead>
					<tbody className="text-center">
						{users.map((user, index) => (
							<tr className="even:bg-dark-gray" key={index}>
								<td className="w-[2.5%] border-r border-[#E4E4E4] py-2">{index + 1}</td>
								<td className="w-[10%] py-2">{user.user_id}</td>
								<td className="py-2">{user.username}</td>
								<td className="py-2">•••••••••••••</td>
								<td className="w-[15%] py-2">{convertDate(user.created_at)}</td>
								<td className="w-[15%] py-2">{convertDate(user.updated_at)}</td>
								<td className="w-[5%]">
									<i
										className="fa-solid fa-ellipsis-vertical fa-lg duration-20 h-full cursor-pointer rounded-lg p-4 text-black transition hover:backdrop-brightness-[.90]"
										onClick={() => {
											setCurrentClickedUser(user);
											setShowQuickEditPopup(true);
										}}
									></i>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showAddPopup && <AddUserPopup onCancel={() => setShowAddPopup(false)} />}
			{showQuickEditPopup && (
				<QuickEditUserPopup user={currentClickedUser!} onCancel={() => setShowQuickEditPopup(false)} />
			)}
		</>
	);
}

function RoutesTab() {
	const routeTabList: Array<routeTab> = ['Routes', 'Locations'];
	const [routeTab, setRouteTab] = useState<routeTab>('Routes');

	return (
		<div className="my-4 flex flex-col gap-4">
			<div className="flex h-[3rem] w-full border border-[#E4E4E4]">
				{routeTabList.map((tab) => (
					<button
						key={tab}
						className={`px-4 ${routeTab === tab ? 'bg-[#e4e4e4]' : 'duration-20 transition hover:backdrop-brightness-75'}`}
						onClick={() => setRouteTab(tab)}
					>
						<p
							className={`duration-20 font-primary text-[1rem] transition ${routeTab === tab ? 'font-bold' : 'font-normal'}`}
						>
							{tab}
						</p>
					</button>
				))}
			</div>

			{routeTab === 'Routes' && <RouteList />}
			{routeTab === 'Locations' && <LocationList />}
		</div>
	);
}

function RouteList() {
	const [routes, setRoutes] = useState<Route[]>([] as Route[]);
	const [currentClickedRoute, setCurrentClickedRoute] = useState<Route | null>(null);
	const [showQuickEditPopup, setShowQuickEditPopup] = useState(false);
	const [searchInput, setSearchInput] = useState<string>('');

	const { data, error } = useGetRoutes();
	const { data: searchData, error: searchError } = useSearchRoutes(searchInput);

	useEffect(() => {
		if (error) {
			toast.error('Failed to fetch data');
		}

		if (data) {
			setRoutes(data);
			console.log(data);
		}
	}, [data, error]);

	useEffect(() => {
		if (searchError) {
			console.error(searchError);
			toast.error('An error occurred while fetching the routes');
		}
		if (searchData) {
			setRoutes(searchData);
		}
	}, [searchData, searchError]);

	useEffect(() => {
		if (showQuickEditPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [showQuickEditPopup]);

	function handleSearch(input: string) {
		if (data) {
			if (input === '' || input === null) {
				setRoutes(data);
			} else {
				setSearchInput(input);
			}
		}
	}

	return (
		<>
			<div className="font-regular flex justify-between px-2 font-secondary text-[1rem] text-black">
				<div className="w-[20rem]">
					<TextInput placeholder="Search Routes" onChange={handleSearch} />
				</div>
				<div>
					<Button>
						<Link href="/admin/map/add/route">+ Add Route</Link>
					</Button>
				</div>
			</div>

			<h3 className="px-2 font-secondary text-[1.25rem] font-normal text-black">Total Routes: {routes.length}</h3>

			<table className="w-full table-fixed border-separate border-spacing-x-0 border border-[#E4E4E4] font-secondary text-[1rem]">
				<thead className="bg-[#E4E4E4] text-center">
					<tr>
						<th className="w-[2.5%] border-r border-[#E4E4E4] py-2">#</th>
						<th className="w-[10%] py-2">Route ID</th>
						<th className="py-2">Route Name</th>
						<th className="w-[10%] py-2">Category</th>
						<th className="w-[10%] py-2">Minimum Fare</th>
						<th className="w-[15%] py-2">Date Created</th>
						<th className="w-[15%] py-2">Last Modified</th>
						<th className="w-[5%] py-2"></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{routes.map((route, index) => (
						<tr className="even:bg-dark-gray" key={index}>
							<td className="w-[2.5%] border-r border-[#E4E4E4] py-2">{index + 1}</td>
							<td className="w-[10%] py-2">{route.route_id}</td>
							<td className="py-2">{route.route_name}</td>
							<td className="w-[10%] py-2">{route.category}</td>
							<td className="w-[10%] py-2">₱{route.min_fare.toFixed(2)}</td>
							<td className="w-[15%] py-2">{convertDate(route.created_at)}</td>
							<td className="w-[15%] py-2">{convertDate(route.updated_at)}</td>
							<td className="w-[5%]">
								<i
									className="fa-solid fa-ellipsis-vertical fa-lg duration-20 h-full cursor-pointer rounded-lg p-4 text-black transition hover:backdrop-brightness-[.90]"
									onClick={() => {
										setCurrentClickedRoute(route);
										setShowQuickEditPopup(true);
									}}
								></i>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showQuickEditPopup && (
				<QuickEditRoutesPopup route={currentClickedRoute!} onCancel={() => setShowQuickEditPopup(false)} />
			)}
		</>
	);
}

function LocationList() {
	const [locations, setLocations] = useState<Location[]>([] as Location[]);
	const [currentClickedLocation, setCurrentClickedLocation] = useState<Location | null>(null);
	const [showQuickEditPopup, setShowQuickEditPopup] = useState(false);
	const [searchInput, setSearchInput] = useState<string>('');

	const { data, error } = useGetLocations();
	const { data: searchData, error: searchError } = useSearchLocations(searchInput);

	useEffect(() => {
		if (error) {
			toast.error('Failed to fetch data');
		}

		if (data) {
			setLocations(data);
			console.log(data);
		}
	}, [data, error]);

	useEffect(() => {
		if (searchError) {
			console.error(searchError);
			toast.error('An error occurred while fetching the locations');
		}
		if (searchData) {
			setLocations(searchData);
		}
	}, [searchData, searchError]);

	useEffect(() => {
		if (showQuickEditPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [showQuickEditPopup]);

	function handleSearch(input: string) {
		if (data) {
			if (input === '' || input === null) {
				setLocations(data);
			} else {
				setSearchInput(input);
			}
		}
	}

	return (
		<>
			<div className="font-regular flex justify-between px-2 font-secondary text-[1rem] text-black">
				<div className="w-[20rem]">
					<TextInput placeholder="Search Locations" onChange={handleSearch} />
				</div>
				<div>
					<Button>
						<Link href="/admin/map/add/route">+ Add Route</Link>
					</Button>
				</div>
			</div>

			<h3 className="px-2 font-secondary text-[1.25rem] font-normal text-black">Total Locations: {locations.length}</h3>

			<table className="w-full table-fixed border-separate border-spacing-x-0 border border-[#E4E4E4] font-secondary text-[1rem]">
				<thead className="bg-[#E4E4E4] text-center">
					<tr>
						<th className="w-[2.5%] border-r border-[#E4E4E4] py-2">#</th>
						<th className="w-[10%] py-2">Location ID</th>
						<th className="py-2">Location Name</th>
						<th className="w-[10%] py-2">Longitude</th>
						<th className="w-[10%] py-2">Latitude</th>
						<th className="w-[15%] py-2">Date Created</th>
						<th className="w-[15%] py-2">Last Modified</th>
						<th className="w-[5%] py-2"></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{locations.map((location, index) => (
						<tr className="even:bg-dark-gray" key={index}>
							<td className="w-[2.5%] border-r border-[#E4E4E4] py-2">{index + 1}</td>
							<td className="w-[10%] py-2">{location.location_id}</td>
							<td className="py-2">{location.location_name}</td>
							<td className="w-[10%] truncate py-2">{location.longitude}</td>
							<td className="w-[10%] truncate py-2">{location.latitude}</td>
							<td className="w-[15%] py-2">{convertDate(location.created_at)}</td>
							<td className="w-[15%] py-2">{convertDate(location.updated_at)}</td>
							<td className="w-[5%]">
								<i
									className="fa-solid fa-ellipsis-vertical fa-lg duration-20 h-full cursor-pointer rounded-lg p-4 text-black transition hover:backdrop-brightness-[.90]"
									onClick={() => {
										setCurrentClickedLocation(location);
										setShowQuickEditPopup(true);
									}}
								></i>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showQuickEditPopup && (
				<QuickEditLocationsPopup location={currentClickedLocation!} onCancel={() => setShowQuickEditPopup(false)} />
			)}
		</>
	);
}
