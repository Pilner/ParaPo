import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="h-[8rem] w-full bg-black">
			<div className="m-auto flex h-full w-3/4 items-center justify-between gap-16 text-gray">
				<div className="flex w-full flex-col">
					<div className="flex w-full items-center justify-between">
						<h2 className="font-primary text-regular-text font-bold">Contact Us</h2>
						<div className="flex gap-8 font-primary text-regular-text font-bold">
							<Link href={'#'}>
								<h2 className="duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[2]">Privacy Policy</h2>
							</Link>
							<Link href={'#'}>
								<h2 className="duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[2]">
									Terms & Conditions
								</h2>
							</Link>
						</div>
					</div>
					<div className="flex gap-8">
						<Link href={'#'}>
							<i className="fa-brands fa-linkedin fa-xl duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[2]"></i>
						</Link>
						<Link href={'#'}>
							<i className="fa-brands fa-facebook fa-xl duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[2]"></i>
						</Link>
						<Link href={'#'}>
							<i className="fa-brands fa-instagram fa-xl duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[2]"></i>
						</Link>
						<Link href={'#'}>
							<i className="fa-solid fa-envelope fa-xl duration-20 rounded-lg p-2 transition hover:backdrop-brightness-[2]"></i>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
