import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/_components/semantics/Navbar";
import Footer from "@/_components/semantics/Footer";
import Button, {AltButton} from "@/_components/Button";
import Line from "@/_components/Line";

export default function Home() {
    return (
		<>
			<section id={styles.heroPage}>
				<div className="container">
					<Navbar />
					<div id={styles.hero}>
						<h1 className="hero-title">
							NAVIGATE WITH <span className="orange">EASE</span>
						</h1>
						<p className="hero-text">
							A Navigation App Tailored for Public
							<br />
							Utility Vehicles and Commuters.
						</p>
						<div className={styles.buttonDiv}>
							<div>
								<Button text="Try Now" url="#" />
								<AltButton text="About Us" url={"#aboutPage"} />
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="transition1"></div>
			<section id={styles.aboutPage}>
				<div className="container">
					<div>
						<div className={styles.aboutPicture}>
							<div>
								<div>
									<Image
										src={"/images/parapo_example1.png"}
										alt="ParaPo Software Example 1"
										width={0}
										height={0}
										style={{
											width: "60%",
											height: "auto",
										}}
										unoptimized={true}
									/>
									<Image
										src={"/images/parapo_example2.png"}
										alt="ParaPo Software Example 2"
										width={0}
										height={0}
										style={{
											width: "60%",
											height: "auto",
										}}
										unoptimized={true}
									/>
								</div>
							</div>
						</div>
						<div className={styles.aboutContent}>
							<div>
								<h2 className="section-title">
									<span className="vline"></span>
									About <span className="orange">ParaPo</span>
								</h2>
								<p className="section-text">
									ParaPo emerges as a solution to address the
									common challenge faced by visitors and
									foreigners in unfamiliar cities, where the
									lack of knowledge about PUV routes can
									hinder mobility and exploration. By
									providing clear, concise, and user-friendly
									information about PUV routes, stops, and
									schedules, ParaPo bridges the gap between
									insider knowledge and outsider navigation,
									empowering users to navigate urban
									environments with confidence and ease.
								</p>
								<p className="section-text">
									In essence, ParaPo represents a step towards
									democratizing access to transportation
									information, promoting inclusivity, and
									enhancing the overall travel experience for
									visitors and foreigners in the Philippines.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Line></Line>
			<Footer />
		</>
	);
}
