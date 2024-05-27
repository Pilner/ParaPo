import Image from "next/image";
import Link from "next/link";

import Line from "@/_components/Line";

import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
	return (
		<footer id={styles.footer}>
			<Line></Line>
			<div className="container">
				<div id={styles.footerLeft}>
					<div>
						<div>
							<h2 className="section-title">Contact Us</h2>
						</div>
						<div>
							<Link href={"#"}>
								<FontAwesomeIcon icon={faLinkedin} />
							</Link>
							<Link href={"#"}>
								<FontAwesomeIcon icon={faFacebook} />
							</Link>
							<Link href={"#"}>
								<FontAwesomeIcon icon={faInstagram} />
							</Link>
							<Link href={"#"}>
								<FontAwesomeIcon icon={faEnvelope} />
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
								<FontAwesomeIcon icon={faLinkedin} />
							</Link>
							<Link href={"#"}>
								<FontAwesomeIcon icon={faFacebook} />
							</Link>
							<Link href={"#"}>
								<FontAwesomeIcon icon={faInstagram} />
							</Link>
							<Link href={"#"}>
								<FontAwesomeIcon icon={faEnvelope} />
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