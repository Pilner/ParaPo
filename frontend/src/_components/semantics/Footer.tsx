import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
	return (
		<footer id={styles.footer}>
			<div className="container">
				<div id={styles.footerLeft}>
					<div>
						<div>
							<h2 className="section-title">Contact Us</h2>
						</div>
						<div>
							<FontAwesomeIcon icon={faLinkedin} />
							<FontAwesomeIcon icon={faFacebook} />
							<FontAwesomeIcon icon={faInstagram} />
							<FontAwesomeIcon icon={faEnvelope} />
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