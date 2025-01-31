import Link from 'next/link';
import Image from 'next/image';

import Button from '@/_components/Button';

export default function Navbar() {
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
						<li>
							<Link href="/">
								<p className="duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[.90]">Home</p>
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

export function MapNavbar() {
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
