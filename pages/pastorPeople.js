import React from "react";
import styles from "../styles/pastorPeople.module.scss";
import AdminLoginCard from "../components/admin/adminLoginCard";

const pastorPeople = () => {
	return (
		<div className={styles.pastorPeopleMainContainer}>
			<AdminLoginCard />
		</div>
	);
};

export default pastorPeople;
