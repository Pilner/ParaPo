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
						src={"/images/temp_logo.png"}
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
				<div>
					<p>ParaPo</p>
				</div>
			</div>
			<div id={styles.navRight}>
				<div>
					<ul>
						<li>
							<Link href="#" scroll={false}>
								HOME
							</Link>
						</li>
						<li>
							<Link href="#aboutPage" scroll={false}>
								ABOUT
							</Link>
						</li>
						<li>
							<Link href="#">CATALOGS</Link>
						</li>
						<li>
							<Button text="GET STARTED" url="#" />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}
