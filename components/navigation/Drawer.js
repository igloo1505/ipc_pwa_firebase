import React, { useEffect, useState } from "react";
import styles from "../../styles/Drawer.module.scss";
import { useDispatch, connect } from "react-redux";
import clsx from "clsx";
import gsap from "gsap";
import Sidebar_Link from "./Sidebar_Link";

const drawerContainerId = "drawer-container";

const drawerLinks = [
	{
		href: "/belong",
		displayString: "Belong",
	},
	{
		href: "/learn",
		displayString: "Learn",
	},
	{
		href: "/grow",
		displayString: "Grow",
	},
	{
		href: "/serve",
		displayString: "Serve",
	},
];

const Drawer = ({
	UI: {
		navigation: {
			drawer: { isOpen: drawerIsOpen },
		},
	},
}) => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		// console.log("Running drawer animation");
		setDrawerOpen(drawerIsOpen);
		toggleDrawerAnimation(drawerIsOpen);
	}, [drawerIsOpen]);

	return (
		<div
			className={clsx(
				styles.drawerContainer
				// !drawerIsOpen && styles.drawerContainerClosed
			)}
			id={drawerContainerId}
		>
			<div className={styles.sidebarLinkSection}>
				<div className={styles.sidebarTopOffset}></div>
				{drawerLinks.map((linkData, index) => {
					return (
						<Sidebar_Link key={`sidebar-link-${index}`} linkData={linkData} />
					);
				})}
			</div>
		</div>
	);
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
				opacity: 0,
			}
		);
	}
};
