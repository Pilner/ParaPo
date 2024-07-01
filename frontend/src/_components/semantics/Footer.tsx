import Image from "next/image";
import Link from "next/link";

import Line from "@/_components/Line";

import styles from "../styles/Footer.module.css";
export default function Footer() {
	return (
		<footer id={styles.footer}>
			<Line></Line>
			<div className="container">
				<div id={styles.footerLeft}>
					<div>
						<div>
							<h1 className="sectionTitleFont">Contact Us</h1>
						</div>
						<div>
							<Link href={"#"}>
								<i className="fa-brands fa-linkedin fa-2xl"></i>
							</Link>
							<Link href={"#"}>
								<i className="fa-brands fa-facebook fa-2xl"></i>
							</Link>
							<Link href={"#"}>
								<i className="fa-brands fa-instagram fa-2xl"></i>
							</Link>
							<Link href={"#"}>
								<i className="fa-solid fa-envelope fa-2xl"></i>
							</Link>
						</div>
					</div>
				</div>
				<div id={styles.footerRight}>
					<div>
						<ul>
							<li>
								<Link href={"#"} aria-theme="dark">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href={"#"} aria-theme="dark">
									Terms & Conditions
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export function AltFooter() {
	return (
		<footer id={styles.altFooter}>
			<Line></Line>
			<div className="container">
				<div id={styles.footerLeft}>
					<div>
						<div>
							<h2 className="section-title">Contact Us</h2>
						</div>
						<div>
							<Link href={"#"}>
								<i className="fa-brands fa-linkedin fa-2xl"></i>
							</Link>
							<Link href={"#"}>
								<i className="fa-brands fa-facebook fa-2xl"></i>
							</Link>
							<Link href={"#"}>
								<i className="fa-brands fa-instagram fa-2xl"></i>
							</Link>
							<Link href={"#"}>
								<i className="fa-solid fa-envelope fa-2xl"></i>
							</Link>
						</div>
					</div>
				</div>
				<div id={styles.footerRight}>
					<div>
						<ul className="section-text">
							<li>
								<Link href={"#"}>Privacy Policy</Link>
							</li>
							<li>
								<Link href={"#"}>Terms & Conditions</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}