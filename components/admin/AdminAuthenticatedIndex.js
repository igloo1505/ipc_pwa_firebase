import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminAuthenticatedIndex.module.scss";
import gsap from "gsap";
import { connect } from "react-redux";
import AdminAuthenticatedIndex_mobile from "./AdminAuthenticatedIndex_mobile";
import AdminAuthenticatedIndex_desktop from "./AdminAuthenticatedIndex_desktop";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile as isMobileDevice,
} from "react-device-detect";
const slidingContainerId = "sliding-container-admin-authenticated";

const AdminAuthenticatedIndex = ({
	UI: {
		viewport: { width: device_width, height: device_height },
	},
}) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(isMobileDevice);
	}, [device_height, device_width]);
	return (
		<div className={styles.authenticatedOuterContainer} id={slidingContainerId}>
			{isMobile ? (
				<AdminAuthenticatedIndex_mobile />
			) : (
				<AdminAuthenticatedIndex_desktop />
			)}
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	props: props,
});

export default connect(mapStateToProps)(AdminAuthenticatedIndex);
