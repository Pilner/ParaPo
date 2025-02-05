import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="h-[8rem] w-full bg-black">
			<div className="m-auto flex h-full w-3/4 items-center justify-between gap-16 text-gray">
				<div className="flex w-full flex-col">
					<div className="
					flex w-full items-center justify-between
					flex-col-reverse lg:flex-row
					gap-2 lg:gap-0
					">
						<h2 className="font-primary font-bold
						text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text
						lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text
						">Contact Us</h2>
						<div className="
						flex font-primary font-bold
						gap-4 lg:gap-8
						text-center lg:text-left

						text-base-regular-text sm:text-sm-regular-text md:text-md-regular-text
						lg:text-lg-regular-text xl:text-xl-regular-text 2xl:text-regular-text
						">
							<Link href={'#'}>
								<h2 className="duration-20 rounded-lg p-1 lg:p-2 transition hover:backdrop-brightness-[2]">Privacy Policy</h2>
							</Link>
							<Link href={'#'}>
								<h2 className="duration-20 rounded-lg p-1 lg:p-2 transition hover:backdrop-brightness-[2]">
									Terms & Conditions
								</h2>
							</Link>
						</div>
					</div>
					<div className="
					flex 
					pt-2 lg:pt-0
					justify-center lg:justify-start 
					gap-2 sm:gap-4 md:gap-6 lg:gap-8">
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
