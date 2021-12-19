import React, { useEffect, useState } from "react";
import styles from "../../styles/Drawer.module.scss";
import { useDispatch, connect } from "react-redux";
import clsx from "clsx";
import gsap from "gsap";
import Sidebar_Link from "./Sidebar_Link";
import settings from "../../appData/appWideSettings";

const drawerContainerId = "drawer-container";

const Drawer = ({
	UI: {
		navigation: {
			drawer: { isOpen: drawerIsOpen },
		},
		viewport: { width: viewportWidth, height: viewportHeight },
	},
}) => {
	useEffect(() => {
		// console.log("Running drawer animation");
		toggleDrawerAnimation(drawerIsOpen);
	}, [drawerIsOpen]);
	// if (viewportWidth > settings.navbarDrawerBreakpoint) {
	return (
		<div
			className={clsx(
				styles.drawerContainer,
				drawerIsOpen && styles.drawerContainerOpen
				// !drawerIsOpen && styles.drawerContainerClosed
			)}
			id={drawerContainerId}
		>
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
				{settings.navLinks.map((linkData, index) => {
					return (
						<Sidebar_Link key={`sidebar-link-${index}`} linkData={linkData} />
					);
				})}
			</div>
		</div>
	);
	// }
};

const mapStateToProps = (state, props) => ({
	props: props,
	UI: state.UI,
});

export default connect(mapStateToProps)(Drawer);

const toggleDrawerAnimation = (isOpen) => {
	if (isOpen) {
		gsap.fromTo(
			`#${drawerContainerId}`,
			{
				transform: "translateX(100%)",
				opacity: 0,
			},
			{
				transform: "translateX(0)",
				opacity: 1,
			}
		);
	}
	if (!isOpen) {
		gsap.fromTo(
			`#${drawerContainerId}`,
			{
				transform: "translateX(0)",
				opacity: 1,
			},
			{
				transform: "translateX(100%)",
				// opacity: 0,
			}
		);
	}
};
