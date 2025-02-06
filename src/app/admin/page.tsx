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
import { GetRouteData, GetUserData, GetLocationData } from '@/_types/GetData';

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
				<div className="m-auto flex h-full w-[90%] flex-col sm:w-[85%] lg:w-[80%] xl:w-[75%]">
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
						<div className="hidden self-center px-4 sm:inline">
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
	const [data, setData] = useState<GetUserData | null>(null);
	const [currentClickedUser, setCurrentClickedUser] = useState<User | null>(null);
	const [showAddPopup, setShowAddPopup] = useState(false);
	const [showQuickEditPopup, setShowQuickEditPopup] = useState(false);
	const [searchInput, setSearchInput] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);

	const { data: userData, error: userError } = useGetUsers(currentPage);
	const { data: searchData, error: searchError } = useSearchUsers(searchInput, currentPage);

	useEffect(() => {
		if (userError) {
			toast.error('Failed to fetch data');
		}

		if (userData) {
			setData(userData);
			console.log(userData);
		}
	}, [userData, userError, currentPage]);

	useEffect(() => {
		if (searchError) {
			console.error(searchError);
			toast.error('An error occurred while fetching the users');
		}
		if (searchData) {
			setData(searchData);
		}
	}, [searchData, searchError, currentPage]);

	useEffect(() => {
		if (showAddPopup || showQuickEditPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [showAddPopup, showQuickEditPopup]);

	function handleSearch(input: string) {
		if (userData) {
			setSearchInput(input);
			if (input === '') {
				setCurrentPage(1);
				setData(userData);
			} else {
				setCurrentPage(1);
			}
		}
	}

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
				<div className="font-regular flex flex-col justify-between px-2 font-secondary text-[1rem] text-black md:flex-row">
					<div className="w-full md:w-[20rem]">

						<TextInput placeholder="Search User" onChange={handleSearch} />
					</div>
					<div className="ml-auto mt-4 md:ml-0 md:mt-0">
						<Button onClick={() => setShowAddPopup(true)}>+ Add User</Button>
					</div>
				</div>
				<h3 className="px-2 font-secondary text-[1.25rem] font-normal text-black">
					Total Users: {data && data.totalUsers}
				</h3>
				<table className="w-full table-fixed border-separate border-spacing-0 border border-[#E4E4E4] font-secondary text-[1rem]">
					<thead className="bg-[#E4E4E4] text-center">
						<tr>
							<th className="w-[10%] border-r border-[#E4E4E4] py-2 md:table-cell md:w-[7.5%] lg:w-[5%] xl:w-[2.5%]">
								#
							</th>
							<th className="py-2 md:table-cell lg:w-[10%]">User ID</th>
							<th className="py-2 md:table-cell">Username</th>
							<th className="hidden py-2 sm:table-cell">Password</th>
							<th className="hidden w-[15%] py-2 md:table-cell">Date Created</th>
							<th className="hidden w-[15%] py-2 lg:table-cell">Last Modified</th>
							<th className="w-[15%] md:table-cell md:w-[10%] lg:w-[5%]"></th>
						</tr>
					</thead>
					<tbody className="text-center">
						{data?.users.map((user, index) => (
							<tr className="even:bg-dark-gray" key={index}>
								<td className="w-[10%] border-r border-[#E4E4E4] py-2 md:w-[7.5%] lg:w-[5%] xl:w-[2.5%]">
									{index + 1 + (currentPage - 1) * 10}
								</td>
								<td className="py-2 md:table-cell lg:w-[10%]">{user.user_id}</td>
								<td className="py-2">{user.username}</td>
								<td className="hidden py-2 sm:table-cell">•••••••••••••</td>
								<td className="hidden w-[15%] py-2 md:table-cell">{convertDate(user.created_at)}</td>
								<td className="hidden w-[15%] py-2 lg:table-cell">{convertDate(user.updated_at)}</td>
								<td className="w-[15%] md:table-cell md:w-[10%] lg:w-[5%]">
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
			<div className="flex w-full justify-center gap-4">
				<Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
					<i className="fa-solid fa-chevron-left"></i>
				</Button>
				<Button
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={!data || data?.totalUsers! <= currentPage * 10}
				>
					<i className="fa-solid fa-chevron-right"></i>
				</Button>
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
	const [data, setData] = useState<GetRouteData | null>(null);
	const [currentClickedRoute, setCurrentClickedRoute] = useState<Route | null>(null);
	const [showQuickEditPopup, setShowQuickEditPopup] = useState(false);
	const [searchInput, setSearchInput] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);

	const { data: routeData, error: routeError } = useGetRoutes(currentPage);
	const { data: searchData, error: searchError } = useSearchRoutes(searchInput, currentPage);

	useEffect(() => {
		if (routeError) {
			toast.error('Failed to fetch data');
		}

		if (routeData) {
			setData(routeData);
			console.log(routeData);
		}
	}, [routeData, routeError, currentPage]);

	useEffect(() => {
		if (searchError) {
			console.error(searchError);
			toast.error('An error occurred while fetching the routes');
		}
		if (searchData) {
			setData(searchData);
		}
	}, [searchData, searchError, currentPage]);

	useEffect(() => {
		if (showQuickEditPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [showQuickEditPopup]);

	function handleSearch(input: string) {
		if (routeData) {
			setSearchInput(input);
			if (input === '') {
				setCurrentPage(1);
				setData(routeData);
			} else {
				setCurrentPage(1);
			}
		}
	}

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
			<div className="font-regular flex flex-col justify-between px-2 font-secondary text-[1rem] text-black md:flex-row">
				<div className="w-full md:w-[20rem]">
					<TextInput placeholder="Search Routes" onChange={handleSearch} />
				</div>
				<div className="ml-auto mt-4 md:ml-0 md:mt-0">
					<Button>
						<Link href="/admin/map/add/route">+ Add Route</Link>
					</Button>
				</div>
			</div>

			<h3 className="px-2 font-secondary text-[1.25rem] font-normal text-black">
				Total Routes: {data && data.totalRoutes}
			</h3>

			<table className="w-full table-fixed border-separate border-spacing-x-0 border border-[#E4E4E4] font-secondary text-[1rem]">
				<thead className="bg-[#E4E4E4] text-center">
					<tr>
						<th className="w-[10%] border-r border-[#E4E4E4] py-2 md:w-[7.5%] lg:w-[5%] xl:w-[2.5%]">#</th>
						<th className="w-[22.5%] py-2 lg:w-[10%]">Route ID</th>
						<th className="py-2">Route Name</th>
						<th className="hidden w-[15%] py-2 md:table-cell lg:w-[10%]">Category</th>
						<th className="hidden w-[15%] py-2 md:table-cell lg:w-[10%]">Minimum Fare</th>
						<th className="hidden w-[15%] py-2 lg:table-cell">Date Created</th>
						<th className="hidden w-[15%] py-2 lg:table-cell">Last Modified</th>
						<th className="w-[15%] md:table-cell md:w-[10%] lg:w-[5%]"></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{data?.routes.map((route, index) => (
						<tr className="even:bg-dark-gray" key={index}>
							<td className="w-[10%] border-r border-[#E4E4E4] py-2 md:w-[7.5%] lg:w-[5%] xl:w-[2.5%]">
								{index + 1 + (currentPage - 1) * 10}
							</td>
							<td className="w-[22.5%] py-2 lg:w-[10%]">{route.route_id}</td>
							<td className="py-2">{route.route_name}</td>
							<td className="hidden w-[15%] py-2 md:table-cell lg:w-[10%]">{route.category}</td>
							<td className="hidden w-[15%] py-2 md:table-cell lg:w-[10%]">₱{route.min_fare.toFixed(2)}</td>
							<td className="hidden w-[15%] py-2 lg:table-cell">{convertDate(route.created_at)}</td>
							<td className="hidden w-[15%] py-2 lg:table-cell">{convertDate(route.updated_at)}</td>
							<td className="w-[15%] md:table-cell md:w-[10%] lg:w-[5%]">
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
			<div className="flex w-full justify-center gap-4">
				<Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
					<i className="fa-solid fa-chevron-left"></i>
				</Button>
				<Button
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={!data || data?.totalRoutes! <= currentPage * 10}
				>
					<i className="fa-solid fa-chevron-right"></i>
				</Button>
			</div>
			{showQuickEditPopup && (
				<QuickEditRoutesPopup route={currentClickedRoute!} onCancel={() => setShowQuickEditPopup(false)} />
			)}
		</>
	);
}

function LocationList() {
	const [data, setData] = useState<GetLocationData | null>(null);
	const [currentClickedLocation, setCurrentClickedLocation] = useState<Location | null>(null);
	const [showQuickEditPopup, setShowQuickEditPopup] = useState(false);
	const [searchInput, setSearchInput] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);

	const { data: locationData, error: locationError } = useGetLocations(currentPage);
	const { data: searchData, error: searchError } = useSearchLocations(searchInput, currentPage);

	useEffect(() => {
		if (locationError) {
			toast.error('Failed to fetch data');
		}

		if (locationData) {
			setData(locationData);
			console.log(locationData);
		}
	}, [locationData, locationError, currentPage]);

	useEffect(() => {
		if (searchError) {
			console.error(searchError);
			toast.error('An error occurred while fetching the locations');
		}
		if (searchData) {
			setData(searchData);
		}
	}, [searchData, searchError, currentPage]);

	useEffect(() => {
		if (showQuickEditPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [showQuickEditPopup]);

	function handleSearch(input: string) {
		if (locationData) {
			setSearchInput(input);
			if (input === '') {
				setCurrentPage(1);
				setData(locationData);
			} else {
				setCurrentPage(1);
			}
		}
	}

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
			<div className="font-regular flex flex-col justify-between px-2 font-secondary text-[1rem] text-black md:flex-row">
				<div className="w-full md:w-[20rem]">
					<TextInput placeholder="Search Locations" onChange={handleSearch} />
				</div>
				<div className="ml-auto mt-4 md:ml-0 md:mt-0">
					<Button>
						<Link href="/admin/map/add/route">+ Add Route</Link>
					</Button>
				</div>
			</div>

			<h3 className="px-2 font-secondary text-[1.25rem] font-normal text-black">
				Total Locations: {data && data.totalLocations}
			</h3>

			<table className="w-full table-fixed border-separate border-spacing-x-0 border border-[#E4E4E4] font-secondary text-[1rem]">
				<thead className="bg-[#E4E4E4] text-center">
					<tr>
						<th className="w-[10%] border-r border-[#E4E4E4] py-2 md:w-[7.5%] lg:w-[5%] xl:w-[2.5%]">#</th>
						<th className="w-[22.5%] py-2 lg:w-[10%]">Location ID</th>
						<th className="py-2">Location Name</th>
						<th className="hidden w-[15%] py-2 md:table-cell lg:w-[10%]">Longitude</th>
						<th className="hidden w-[15%] py-2 md:table-cell lg:w-[10%]">Latitude</th>
						<th className="hidden w-[15%] py-2 lg:table-cell">Date Created</th>
						<th className="hidden w-[15%] py-2 lg:table-cell">Last Modified</th>
						<th className="w-[15%] md:table-cell md:w-[10%] lg:w-[5%]"></th>
					</tr>
				</thead>
				<tbody className="text-center">
					{data?.locations.map((location, index) => (
						<tr className="even:bg-dark-gray" key={index}>
							<td className="w-[10%] border-r border-[#E4E4E4] py-2 md:w-[7.5%] lg:w-[5%] xl:w-[2.5%]">
								{index + 1 + (currentPage - 1) * 10}
							</td>
							<td className="w-[22.5%] py-2 lg:w-[10%]">{location.location_id}</td>
							<td className="py-2">{location.location_name}</td>
							<td className="hidden w-[15%] truncate py-2 md:table-cell lg:w-[10%]">{location.longitude}</td>
							<td className="hidden w-[15%] truncate py-2 md:table-cell lg:w-[10%]">{location.latitude}</td>
							<td className="hidden w-[15%] py-2 lg:table-cell">{convertDate(location.created_at)}</td>
							<td className="hidden w-[15%] py-2 lg:table-cell">{convertDate(location.updated_at)}</td>
							<td className="w-[15%] md:table-cell md:w-[10%] lg:w-[5%]">
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
			<div className="flex w-full justify-center gap-4">
				<Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
					<i className="fa-solid fa-chevron-left"></i>
				</Button>
				<Button
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={!data || data?.totalLocations! <= currentPage * 10}
				>
					<i className="fa-solid fa-chevron-right"></i>
				</Button>
			</div>
			{showQuickEditPopup && (
				<QuickEditLocationsPopup location={currentClickedLocation!} onCancel={() => setShowQuickEditPopup(false)} />
			)}
		</>
	);
}
