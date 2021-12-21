import React, { useState } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import styles from "../../styles/AdminPanelLargeTile.module.scss";
import { AiFillInfoCircle } from "react-icons/ai";
import * as Types from "../../state/TYPES";

const AdminPanelLargeTile = ({ tile, gsapClassName, tileIndex }) => {
	const [infoIconHovered, setInfoIconHovered] = useState(false);
	const dispatch = useDispatch();
	const [customStyles, setCustomStyles] = useState({
		backgroundColor: "#710e1f",
	});
	let iconId = `admin-tile-info-icon-${tileIndex}`;
	const handleColorSelect = () => {
		dispatch({
			type: Types.SET_COLOR_SELECT_OPTIONS,
			payload: {
				tileId: tile.id,
				currentColor: customStyles.backgroundColor,
			},
		});
	};
	return (
		<div
			className={clsx(styles.tileOuterContainer, gsapClassName)}
			style={customStyles}
		>
			<AiFillInfoCircle
				className={styles.tileTextIcon}
				onMouseEnter={() => setInfoIconHovered(true)}
				onMouseLeave={() => setInfoIconHovered(false)}
				onClick={handleColorSelect}
				id={iconId}
			/>
			<div className={styles.tileText}>{tile.title}</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	props: props,
});

export default connect(mapStateToProps)(AdminPanelLargeTile);
