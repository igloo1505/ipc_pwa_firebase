import { Button } from "evergreen-ui";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			Welp...
			<Button intent="success" appearance="primary">
				Utility Button
			</Button>
		</div>
	);
}
