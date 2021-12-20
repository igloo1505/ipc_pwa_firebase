import React, { useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import styles from "../../styles/AdminPanelLargeTile.module.scss";
import { AiFillInfoCircle } from "react-icons/ai";
const AdminPanelLargeTile = ({ tile, gsapClassName }) => {
	const [infoIconHovered, setInfoIconHovered] = useState(false);
	return (
		<div className={clsx(styles.tileOuterContainer, gsapClassName)}>
			<AiFillInfoCircle
				className={styles.tileTextIcon}
				onMouseEnter={() => setInfoIconHovered(true)}
				onMouseLeave={() => setInfoIconHovered(false)}
			/>
			<div className={styles.tileText}>{tile.title}</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	props: props,
});

export default connect(mapStateToProps)(AdminPanelLargeTile);
