import Image from "next/image";
import styles from "./notfound.module.css";
import Navbar from "@/_components/semantics/Navbar";
import Footer from "@/_components/semantics/Footer";
import Button from "@/_components/Button";

export default function NotFound() {
  return (
		<>
			<Navbar />
			<section id={styles.notFoundPage}>
				<div className="container mobileContainer">
					<div className={styles.errorPicture}>
						<Image
							src="/images/questionmark.png"
							alt="Not Found Question Mark Picture"
							width={0}
							height={0}
							style={{
								width: "auto",
								height: "100%",
							}}
							unoptimized={true}
						/>
					</div>
					<h1 className="heroTitleFont mobileHeroTitleFont">
						404 NOT
						<br />
						<span className="main-accent">FOUND</span>
					</h1>
					<p className="heroSubtitleFont mobileHeroSubtitleFont">
						Oops! The page you're looking for
						<br />
						doesn't exist.
					</p>
				</div>
			</section>
			<Footer />
		</>
  );
}
