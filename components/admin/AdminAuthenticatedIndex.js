import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminAuthenticatedIndex.module.scss";
import gsap from "gsap";

const slidingContainerId = "sliding-container-admin-authenticated";

const AdminAuthenticatedIndex = () => {
	useEffect(() => {
		animateEntrance();
	}, []);
	return (
		<div
			className={styles.authenticatedOuterContainer}
			id={slidingContainerId}
			onClick={animateEntrance}
		>
			Pastor people authenticated stuff
		</div>
	);
};

export default AdminAuthenticatedIndex;

const animateEntrance = () => {
	gsap.from(`#${slidingContainerId}`, {
		duration: 1,
		y: 500,
		opacity: 0,
		ease: "elastic.out(1, 0.7)",
	});
};
