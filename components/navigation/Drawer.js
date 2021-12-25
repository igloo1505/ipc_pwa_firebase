import React, { useEffect, useState } from "react";
import styles from "../../styles/Drawer.module.scss";
import { useDispatch, connect } from "react-redux";
import clsx from "clsx";
import gsap from "gsap";
import Sidebar_Link from "./Sidebar_Link";
import settings from "../../appData/appWideSettings";
import { Button } from "evergreen-ui";
import { handleLogout } from "../../state/actions/userActions";
import * as Types from "../../state/TYPES";
const drawerContainerId = "drawer-container";

const Drawer = ({
	UI: {
		navigation: {
			drawer: { isOpen: drawerIsOpen },
		},
		viewport: { width: viewportWidth, height: viewportHeight },
	},
	access: { authenticated: isAuthenticated },
	handleLogout,
}) => {
	const dispatch = useDispatch();
	const [initialRender, setInitialRender] = useState(true);
	useEffect(() => {
		if (!initialRender) {
			toggleDrawerAnimation(drawerIsOpen, settings.drawerEase);
		}
		setInitialRender(false);
	}, [drawerIsOpen, viewportWidth]);

	const handleLogoutInternally = () => {
		handleLogout();
	};
	const handleDrawerClose = () => {
		dispatch({
			type: Types.CLOSE_DRAWER,
		});
	};

	return (
		<div
			className={clsx(
				styles.drawerContainer,
				drawerIsOpen && styles.drawerContainerOpen
				// !drawerIsOpen && styles.drawerContainerClosed
			)}
			id={drawerContainerId}
		>
			{drawerIsOpen && (
				<div className={styles.backdrop} onClick={handleDrawerClose} />
			)}
			<div className={styles.sidebarTopOffset}>
				<div className={styles.sidebarTopOffsetContent}>
					<span className={styles.sidebarTopOffsetInviteText}>
						Worship with us
					</span>
					<span className={styles.sidebarTopOffsetText}>
						Sundays at 10:00am
					</span>
				</div>
				<div className={styles.sidebarTopIconOffset}></div>
			</div>
			<div className={styles.sidebarLinkSection}>
				<div className={styles.sidebarLinkSectionInner}>
					{settings.navLinks.map((linkData, index) => {
						return (
							<Sidebar_Link key={`sidebar-link-${index}`} linkData={linkData} />
						);
					})}
				</div>
				<div className={styles.logoutContainer}>
					{isAuthenticated && (
						<Button
							marginRight={16}
							appearance="primary"
							intent="danger"
							onClick={handleLogoutInternally}
						>
							Logout
						</Button>
					)}
				</div>
			</div>
		</div>
	);
	// }
};

const mapStateToProps = (state, props) => ({
	props: props,
	UI: state.UI,
	access: state.access,
});

export default connect(mapStateToProps, { handleLogout })(Drawer);

const toggleDrawerAnimation = (isOpen, drawerEaseSettings) => {
	if (isOpen) {
		gsap.to(`#${drawerContainerId}`, {
			transform: "translateX(0)",
			ease: drawerEaseSettings.drawerEaseString,
			duration: drawerEaseSettings.duration,
			// opacity: 1,
		});
	}
	if (!isOpen) {
		gsap.to(`#${drawerContainerId}`, {
			transform: "translateX(100%)",
			// ease: "bounce.out",
			duration: 0.2,
			opacity: 0,
		});
	}
};
