import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import styles from "../../styles/AdminPanelLargeTile.module.scss";
import { AiFillInfoCircle } from "react-icons/ai";
import * as Types from "../../state/TYPES";

const AdminPanelLargeTile = ({
	tile,
	gsapClassName,
	tileIndex,
	settings: { customTileColors },
}) => {
	const [infoIconHovered, setInfoIconHovered] = useState(false);
	const dispatch = useDispatch();
	const [customStyles, setCustomStyles] = useState({
		backgroundColor: "#710e1f",
	});

	useEffect(() => {
		if (customTileColors) {
			console.log("customTileColors: ", customTileColors);
			let match = customTileColors.filter((ct) => ct.tileId === tile.id);
			console.log("match: ", match);
			if (match.length > 0) {
				let ns = {};
				let _m = match[0];
				if (_m.backgroundColor) {
					ns.backgroundColor = _m.backgroundColor;
				}
				if (_m.textColor) {
					ns.textColor = _m.textColor;
				}
				setCustomStyles(ns);
			}
		}
	}, [customTileColors]);

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
	settings: state.settings,
	access: state.access,
	UI: state.UI,
});

export default connect(mapStateToProps)(AdminPanelLargeTile);
