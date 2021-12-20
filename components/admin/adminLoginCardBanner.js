import React from "react";
import styles from "../../styles/adminLoginCardBanner.module.scss";

const adminLoginCardBanner = () => {
	return (
		<div className={styles.adminLoginBannerContainer}>
			<div className={styles.logoContainer}>
				<div className={styles.titleText}>Immanuel</div>
				<div className={styles.subTitleText}>Presbyterian Church</div>
				<div className={styles.horizontalDivider} />
				<div className={styles.captionText}>
					<span style={{ fontStyle: "italic" }}>transforming</span> tradition
				</div>
			</div>
		</div>
	);
};

export default adminLoginCardBanner;
