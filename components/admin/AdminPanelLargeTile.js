import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import styles from "../../styles/AdminPanelLargeTile.module.scss";
import { AiFillInfoCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import * as Types from "../../state/TYPES";
import store from "../../state/store";

const AdminPanelLargeTile = ({
	tile,
	gsapClassName,
	tileIndex,
	settings: { customTileColors },
}) => {
	const router = useRouter();
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
				if (_m?.colors?.background) {
					ns.backgroundColor = _m.colors.background;
				}
				if (_m?.colors?.text) {
					ns.textColor = _m.colors.text;
				}
				console.log("ns: ", ns);
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
				currentColor: customStyles,
			},
		});
	};

	const handleTileClick = () => {
		tile.action({
			state: store.getState(),
			router: router,
		});
	};

	return (
		<div
			className={clsx(styles.tileOuterContainer, gsapClassName)}
			style={{
				backgroundColor: customStyles.backgroundColor,
			}}
			onClick={handleTileClick}
		>
			<AiFillInfoCircle
				className={styles.tileTextIcon}
				onMouseEnter={() => setInfoIconHovered(true)}
				onMouseLeave={() => setInfoIconHovered(false)}
				onClick={handleColorSelect}
				id={iconId}
			/>
			<div
				className={styles.tileText}
				style={{
					color: customStyles.textColor,
				}}
			>
				{tile.title}
			</div>
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
