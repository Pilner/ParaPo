import Link from "next/link";
import styles from "./styles/button.module.css";

interface ButtonProps {
	text: string;
	url: string;
}

export default function Button({ text, url }: ButtonProps) {
	return (
		<div className={styles.buttonDiv}>
			<Link href={url} scroll={false}>
				<button className={styles.roundButton}>{text}</button>
			</Link>
		</div>
	);
}

export function AltButton({ text, url }: ButtonProps) {
	return (
		<div className={styles.ButtonDiv}>
			<Link href={url} scroll={false}>
				<button className={styles.altRoundButton}>{text}</button>
			</Link>
		</div>
	);
}

// export function ButtonSubmit({ text }: ButtonProps) {
// 	return (
// 		<div className={styles.buttonDiv}>
// 			<button type="submit" className={styles.roundButton}>
// 				{text}
// 			</button>
// 		</div>
// 	);
// }
