import { Button } from "evergreen-ui";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Carousel from "../components/landing/Carousel";
import { useRouter } from "next/router";
export default function Home() {
	const router = useRouter();
	const handleUtilityButton = () => {
		router.push("/pastorPeople");
	};
	return (
		<div className={styles.container}>
			<Carousel />
			<div className={styles.containerLower}>
				Welp...
				<Button
					intent="success"
					appearance="primary"
					onClick={handleUtilityButton}
				>
					Utility Button
				</Button>
			</div>
		</div>
	);
}
