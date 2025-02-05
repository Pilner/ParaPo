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

export default function Navbar() {
	return (
		<nav className="item-center flex h-[6rem] w-full bg-white">
			<div className="
			flex h-full items-center justify-between m-auto
			w-[90%] sm:w-[85%] lg:w-[80%] xl:w-[75%]
			">
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
							<h1 className="
							font-primary font-bold text-black
							hidden lg:block
							
							text-base-regular-text sm:text-sm-regular-text
							lg:text-lg-regular-text xl:text-regular-text">ParaPo</h1>
						</Link>
					</div>
				</div>
				<div className="flex">
					<ul className="
					flex items-center font-secondary font-semibold text-black
					gap-6 lg:gap-16

					text-base-regular-text sm:text-sm-regular-text
					lg:text-lg-regular-text xl:text-regular-text
					">
						<li>
							<Link href="/">
								<p className="
								duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[.90]
								hidden lg:flex
								">Home</p>
							</Link>
						</li>
						<li>
							<Link href="/catalog">
								<p className="
								duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[.90]">Catalog</p>
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

export function MapNavbar() {
	return (
		<nav className="w-full bg-accent
		h-[3rem] sm:h-[4rem] lg:h-[5rem]
		">
			<div className="flex h-full justify-between px-4
			py-1 lg:py-2">
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
				<div className="flex items-center gap-8 font-secondary font-semibold text-gray
				text-[0.75rem] sm:text-[0.9rem] md:text-[1rem]
				">
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

export function MapAdminNavbar() {
	return (
		<nav className="h-[5rem] w-full bg-accent">
			<div className="flex h-full justify-between px-4 py-2">
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
				<div className="flex items-center gap-8 font-secondary text-[1rem] font-semibold text-gray">
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
			<div className="m-auto flex h-full w-3/4 items-center justify-between">
				<div className="flex h-full">
					<div className="flex h-full items-center gap-4">
						<Link href="/" className="h-full">
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
							<h1 className="font-primary text-regular-title font-bold text-black">ParaPo</h1>
						</Link>
					</div>
				</div>
				<div className="flex">
					<ul className="flex items-center gap-16 font-secondary text-regular-text font-semibold text-black">
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
