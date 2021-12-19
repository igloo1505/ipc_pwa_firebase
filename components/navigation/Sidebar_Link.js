import React, { useState } from "react";
import styles from "../../styles/Sidebar_Link.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import * as Types from "../../state/TYPES";
import clsx from "clsx";

const Sidebar_Link = ({ linkData }) => {
	const dispatch = useDispatch();
	const [hovered, setHovered] = useState(false);
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
			<div
				onClick={handleLinkClick}
				className={styles.sidebarLinkContainerInner}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<Link href={linkData.href}>
					<a className={styles.sidebarLinkContent}>{linkData.displayString}</a>
				</Link>
				<div
					className={clsx(
						styles.animatedBottomLinkBorder,
						hovered && styles.animatedBottomLinkHovered
					)}
				></div>
			</div>
		</div>
	);
};

export default Sidebar_Link;
