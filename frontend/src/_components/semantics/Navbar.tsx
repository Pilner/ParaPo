import Link from "next/link";
import Image from "next/image";

import Button from "@/_components/Button";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
	return (
		<nav id={styles.navbar}>
			<div className="container mobileContainer">
				<div className={styles.navLogoSide}>
					<div className={styles.navLogoImg}>
						<Link href="/">
							<Image
								src="/images/ParaPo-Logo-Light.png"
								alt="logo"
								width={0}
								height={0}
								style={{
									width: "75%",
									height: "auto",
								}}
								unoptimized={true}
							/>
						</Link>
					</div>
					<div className={styles.navLogoText}>
						<Link href="/">
							<p>ParaPo</p>
						</Link>
					</div>
				</div>
				<div className={styles.navLinkSide}>
					<div>
						<ul>
							<li>
								<Link href="/" scroll={false}>
									Home
								</Link>
							</li>
							<li>
								<Link href="/catalog" scroll={false}>
									Catalog
								</Link>
							</li>
							<li>
								<Button text="Start" url="/map" />
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.navMenu}>
					<div className={styles.navMenuImg}>
						<i className={`fa-solid fa-bars fa-2xl ${styles.navMenuBars}`}></i>
					</div>
				</div>
			</div>
		</nav>
	);
}

export function MapNavbar() {
	return (
		<nav id={styles.mapNavbar}>
			<div>
				<div className={styles.navLogoSide}>
					<div className={styles.navLogoImg}>
						<Link href="/">
							<Image
								src="/images/ParaPo-Logo-Light.png"
								alt="logo"
								width={0}
								height={0}
								style={{
									width: "75%",
									height: "auto",
								}}
								unoptimized={true}
							/>
						</Link>
					</div>
				</div>
				<div className={styles.navLinkSide}>
					<div>
						<ul>
							<li>
								<Link href="/" scroll={false}>
									Home
								</Link>
							</li>
							<li>
								<Link href="/catalog" scroll={false}>
									Catalog
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className={styles.navMenu}>
					<div className={styles.navMenuImg}>
						<i className={`fa-solid fa-bars fa-2xl ${styles.navMenuBars}`}></i>
					</div>
				</div>
			</div>
		</nav>
	);
}
