import React, { useEffect } from "react";
import styles from "../../styles/Drawer.module.scss";
import { useDispatch, connect } from "react-redux";
import clsx from "clsx";
import gsap from "gsap";

const drawerContainerId = "drawer-container";

const Drawer = ({
	UI: {
		navigation: {
			drawer: { isOpen: drawerIsOpen },
		},
	},
}) => {
	useEffect(() => {
		toggleDrawerAnimation(drawerIsOpen);
	}, [drawerIsOpen]);
	return (
		<div
			className={clsx(
				styles.drawerContainer
				// !drawerIsOpen && styles.drawerContainerClosed
			)}
			id={drawerContainerId}
		></div>
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
				transform: "translateX(0)",
				opacity: 0,
				// backgroundColor: "green",
			},
			{
				transform: "translateX(100%)",
				opacity: 1,
			}
		);
	}
	if (!isOpen) {
		gsap.fromTo(
			`#${drawerContainerId}`,
			{
				transform: "translateX(100%)",
				opacity: 0,
				// backgroundColor: "green",
			},
			{
				transform: "translateX(0)",
				opacity: 1,
			}
		);
	}
};
