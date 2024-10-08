import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/_components/semantics/Navbar";
import Footer from "@/_components/semantics/Footer";
import Button, {ScrollButton} from "@/_components/Button";

export default function Home() {
    return (
		<>
			<Navbar />
			<section id={styles.heroPage}>
				<div className="container mobileContainer">
					<div className={styles.heroText}>
						<div>
							<h1 className="heroTitleFont mobileHeroTitleFont">
								NAVIGATE
								<br />
								WITH <span className="main-accent">EASE</span>
							</h1>
							<p className="heroSubtitleFont mobileHeroSubtitleFont">
								A Navigation App Tailored for Public Utility Vehicles and Commuters.
							</p>
							<div className={styles.heroButtonDiv}>
								<Button text="Get Started" url="/map" />
								<ScrollButton text="Learn More" url={`#${styles.aboutPage}`} />
							</div>
						</div>
					</div>
					<div className={styles.heroPic}>
						<Image
							src="/images/hero-bg.png"
							alt="Hero Picture"
							width={0}
							height={0}
							style={{
								width: "auto",
								height: "85%",
							}}
							unoptimized={true}
						/>
					</div>
					<div className={styles.scrollIndicator}>
						<i className="fa-solid fa-chevron-down fa-2xl"></i>
					</div>
				</div>
			</section>
			<section id={styles.examplePage}>
				<div className="container mobileContainer">
					<Image
						src="/images/parapo-example1.png"
						alt="Software Sample Picture"
						width={0}
						height={0}
						style={{
							width: "80%",
							height: "auto",
							borderRadius: "2.5rem",
							boxShadow: "10px 10px 10px 5px rgba(0, 0, 0, 0.1)",
							
						}}
						unoptimized={true}
					/>
				</div>
			</section>
			<section id={styles.aboutPage}>
				<div className="container mobileContainer">
					<div className={styles.aboutText}>
						<h1 className="sectionTitleFont mobileSectionTitleFont">About Us</h1>
						<p className="sectionTextFont mobileSectionTextFont">
							ParaPo emerges as a solution to address the common
							challenge faced by visitors and foreigners in
							unfamiliar cities, where the lack of knowledge about
							PUV routes can hinder mobility and exploration. By
							providing clear, concise, and user-friendly
							information about PUV routes, stops, and schedules,
							ParaPo bridges the gap between insider knowledge and
							outsider navigation, empowering users to navigate
							urban environments with confidence and ease.
						</p>
						<p className="sectionTextFont mobileSectionTextFont">
							In essence, ParaPo represents a step towards
							democratizing access to transportation information,
							promoting inclusivity, and enhancing the overall
							travel experience for visitors and foreigners in the
							Philippines.
						</p>
					</div>
				</div>
			</section>
			<section id={styles.catalogPage}>
				<div className="container mobileContainer">
					<div className={styles.catalogText}>
						<div>
							<h1 className="sectionTitleFont mobileSectionTitleFont">Our Catalog</h1>
							<p className="sectionTextFont mobileSectionTextFont">
								Beyond just mapping routes, our unique catalog
								feature lets you explore diverse destinations
								without needing a set endpoint.
							</p>
							<Button text="Try Catalog" url="/catalog" />
						</div>
					</div>
					<div className={styles.catalogPic}>
						<Image
							src="/images/parapo-example2.png"
							alt="Catalog Sample Picture"
							width={0}
							height={0}
							style={{
								width: "90%",
								height: "auto",
								borderRadius: "2.5rem",
								boxShadow:
									"10px 10px 10px 5px rgba(0, 0, 0, 0.1)",
							}}
							unoptimized={true}
						/>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
