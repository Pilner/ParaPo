'use client'

import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
	return (
		<nav id={styles.navbar}>
			<div id={styles.navLeft}>
				<div>
					<Image
						src={"/images/TextLogo.svg"}
						alt="logo"
						width={0}
						height={0}
						style={{
							width: "auto",
							height: "100%",
						}}
						unoptimized={true}
					/>
				</div>
			</div>
			<div id={styles.navRight}>
				<div>
					<ul>
						<li>
							<Link href="/" scroll={false}>
								HOME
							</Link>
						</li>
						<li>
							<Link href="/catalog">CATALOGS</Link>
						</li>
						<li>
							<Button text="GET STARTED" url="/catalog" />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
