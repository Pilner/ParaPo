'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

import { User } from '@/_types/Models';
declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

import { useGetUser } from '@/_hooks/useUser';

import Button from '@/_components/Button';

interface NavbarProps {
	onClick?: () => void;
}

export default function Navbar() {
	return (
		<nav className="item-center flex h-[6rem] w-full bg-white">
			<div className="m-auto flex h-full w-[90%] items-center justify-between sm:w-[85%] lg:w-[80%] xl:w-[75%]">
				<div className="flex h-full">
					<div className="flex h-full items-center gap-8">
						<Link href="/" className="h-[80%] sm:h-full">
							<Image
								src="/images/ParaPo-Logo-Light.png"
								alt="logo"
								width={100}
								height={100}
								className="duration-20 h-full w-auto rounded-lg transition hover:backdrop-brightness-[.90]"
								unoptimized={true}
							/>
						</Link>
						<Link href="/">
							<h1 className="hidden font-primary text-base-regular-text font-bold text-black sm:text-sm-regular-text lg:block lg:text-lg-regular-text xl:text-regular-text">
								ParaPo
							</h1>
						</Link>
					</div>
				</div>
				<div className="flex">
					<ul className="flex items-center gap-6 font-secondary text-base-regular-text font-semibold text-black sm:text-sm-regular-text lg:gap-16 lg:text-lg-regular-text xl:text-regular-text">
						<li>
							<Link href="/">
								<p className="duration-20 hidden rounded-lg p-2 transition hover:backdrop-brightness-[.90] lg:flex">
									Home
								</p>
							</Link>
						</li>
						<li>
							<Link href="/catalog">
								<p className="duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[.90]">Catalog</p>
							</Link>
						</li>
						<li>
							<Button variant="solid" type="button">
								<Link href="/map">Try Now</Link>
							</Button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export function MapNavbar({ onClick }: NavbarProps) {
	return (
		<nav
			className={`h-[3rem] w-full bg-accent transition duration-500 sm:h-[4rem] lg:h-[5rem] ${onClick && 'cursor-pointer hover:bg-[#e98364]'}`}
		>
			<div
				className="flex h-full justify-between px-4 py-1 lg:py-2"
				onClick={(e: React.MouseEvent<HTMLElement>) => {
					if (e.target === e.currentTarget) {
						onClick && onClick();
					}
				}}
			>
				<div className="h-full">
					<Link href="/">
						<Image
							src="/images/ParaPo-Logo-Light.png"
							alt="logo"
							width={100}
							height={100}
							className="duration-20 h-full w-auto rounded-lg transition hover:backdrop-brightness-[.90]"
							unoptimized={true}
						/>
					</Link>
				</div>
				<div className="flex items-center gap-8 font-secondary text-[0.75rem] font-semibold text-gray sm:text-[0.9rem] md:text-[1rem]">
					<Link href="/catalog" className="duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[.90]">
						Catalog
					</Link>
					<Link href="/map" className="duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[.90]">
						Map
					</Link>
				</div>
			</div>
		</nav>
	);
}

export function MapAdminNavbar({ onClick }: NavbarProps) {
	return (
		<nav
			className={`h-[3rem] w-full bg-accent transition duration-500 sm:h-[4rem] lg:h-[5rem] ${onClick && 'cursor-pointer hover:bg-[#e98364]'}`}
		>
			<div
				className="flex h-full justify-between px-4 py-1 lg:py-2"
				onClick={(e: React.MouseEvent<HTMLElement>) => {
					if (e.target === e.currentTarget) {
						onClick && onClick();
					}
				}}
			>
				<div className="h-full">
					<Link href="/">
						<Image
							src="/images/ParaPo-Logo-Light.png"
							alt="logo"
							width={100}
							height={100}
							className="duration-20 h-full w-auto rounded-lg transition hover:backdrop-brightness-[.90]"
							unoptimized={true}
						/>
					</Link>
				</div>
				<div className="flex items-center gap-8 font-secondary text-[0.75rem] font-semibold text-gray sm:text-[0.9rem] md:text-[1rem]">
					<button
						onClick={() => (window.location.href = '/admin')}
						className="duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[.90]"
					>
						Dashboard
					</button>
				</div>
			</div>
		</nav>
	);
}

export function AuthNavbar() {
	const { data: session } = useSession();
	const [user, setUser] = useState<User | null>(null);

	const user_id = session?.user?.id;

	const { data, error } = useGetUser(user_id!);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
		if (data) {
			console.log(data);
			setUser(data);
		}
	}, [data, error]);

	return (
		<nav className="item-center flex h-[6rem] w-full bg-white">
			<div className="m-auto flex h-full w-[90%] items-center justify-between sm:w-[85%] lg:w-[80%] xl:w-[75%]">
				<div className="flex h-full">
					<div className="flex h-full items-center gap-8">
						<Link href="/" className="h-[80%] sm:h-full">
							<Image
								src="/images/ParaPo-Logo-Light.png"
								alt="logo"
								width={100}
								height={100}
								className="duration-20 h-full w-auto rounded-lg transition hover:backdrop-brightness-[.90]"
								unoptimized={true}
							/>
						</Link>
						<Link href="/">
							<h1 className="hidden font-primary text-base-regular-text font-bold text-black sm:text-sm-regular-text lg:block lg:text-lg-regular-text xl:text-regular-text">
								ParaPo
							</h1>
						</Link>
					</div>
				</div>
				<div className="flex">
					<ul className="flex items-center gap-6 font-secondary text-base-regular-text font-semibold text-black sm:text-sm-regular-text lg:gap-16 lg:text-lg-regular-text xl:text-regular-text">
						<li className={`duration-20 transition ${user ? 'opacity-100' : 'opacity-0'}`}>
							<p className="duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[.90]">
								{user && user.username}
							</p>
						</li>

						<li>
							<Button
								variant="solid"
								type="button"
								onClick={() =>
									signOut({
										callbackUrl: '/',
										redirect: true,
									})
								}
							>
								Sign Out
							</Button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
