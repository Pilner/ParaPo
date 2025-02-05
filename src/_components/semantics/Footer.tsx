import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="h-[8rem] w-full bg-black">
			<div className="m-auto flex h-full w-3/4 items-center justify-between gap-16 text-gray">
				<div className="flex w-full flex-col">
					<div className="flex w-full flex-col-reverse items-center justify-between gap-2 lg:flex-row lg:gap-0">
						<h2 className="font-primary text-base-regular-text font-bold sm:text-sm-regular-text md:text-md-regular-text lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
							Contact Us
						</h2>
						<div className="flex gap-4 text-center font-primary text-base-regular-text font-bold sm:text-sm-regular-text md:text-md-regular-text lg:gap-8 lg:text-left lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text">
							<Link href={'#'}>
								<h2 className="duration-20 rounded-lg p-1 transition hover:backdrop-brightness-[2] lg:p-2">
									Privacy Policy
								</h2>
							</Link>
							<Link href={'#'}>
								<h2 className="duration-20 rounded-lg p-1 transition hover:backdrop-brightness-[2] lg:p-2">
									Terms & Conditions
								</h2>
							</Link>
						</div>
					</div>
					<div className="flex justify-center gap-2 pt-2 sm:gap-4 md:gap-6 lg:justify-start lg:gap-8 lg:pt-0">
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
