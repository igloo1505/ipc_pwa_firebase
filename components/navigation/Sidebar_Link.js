import React from "react";
import styles from "../../styles/Sidebar_Link.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import * as Types from "../../state/TYPES";

const Sidebar_Link = ({ linkData }) => {
	const dispatch = useDispatch();
	const handleLinkClick = (e) => {
		// debugger;
		dispatch({
			type: Types.TOGGLE_DRAWER,
			payload: {
				isOpen: false,
			},
		});
	};
	return (
		<div className={styles.sidebarLinkContainerOuter}>
			<div onClick={handleLinkClick}>
				<Link href={linkData.href} className={styles.sidebarLinkContent}>
					{linkData.displayString}
				</Link>
			</div>
		</div>
	);
};

export default Sidebar_Link;
