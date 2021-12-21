import React, { useState, useEffect } from "react";
import styles from "../../styles/AdminTileColorDropdown.module.scss";
import ClientSidePortal from "../general/ClientSidePortal";
import { connect, useDispatch } from "react-redux";
import { Dialog } from "evergreen-ui";
import ColorOptionImage from "./ColorOption";
import * as Types from "../../state/TYPES";

const AdminTileColorDropdown = ({
	UI: {
		viewport: { width: viewportWidth, height: viewportHeight },
		colorSelect: { targetId, shouldShow, currentColor },
	},
	props: {},
}) => {
	const dispatch = useDispatch();
	const [position, setPosition] = useState({});
	const [visible, setVisible] = useState(true);
	const [titleBackgroundColor, setTitleBackgroundColor] = useState({});
	const [isHovering, setIsHovering] = useState(false);
	useEffect(() => {
		setVisible(shouldShow);
	}, [shouldShow]);

	const closeColorSelect = () => {
		dispatch({
			type: Types.CLOSE_COLOR_SELECT,
		});
	};

	useEffect(() => {
		if (currentColor?.backgroundColor && !isHovering) {
			setTitleBackgroundColor({
				backgroundColor: currentColor.backgroundColor,
			});
		}
		// console.log("is hovering", isHovering);
	}, [currentColor, isHovering]);

	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	let np = {};
	// 	let em = document.getElementById(targetId).getBoundingClientRect();
	// 	console.log("em: ", em);
	// 	np.top = em.top + em.height + 10;
	// 	np.left = em.left - em.width;
	// 	console.log("targetId", targetId);
	// 	setPosition(np);
	// }, [viewportHeight, viewportWidth]);
	return (
		<ClientSidePortal>
			<div className={styles.colorSelectDropdownContainer} style={position}>
				<Dialog
					isShown={visible}
					onCloseComplete={() => closeColorSelect(false)}
					preventBodyScrolling
					confirmLabel="Change"
					hasHeader={false}
					padding="0"
					contentContainerProps={{ padding: "0" }}
				>
					<div className={styles.dialogTitle} style={titleBackgroundColor}>
						<div className={styles.dialogTitleText}>Set a custom color:</div>
					</div>
					<div className={styles.mainDialogContentContainer}>
						<ColorOptionImage
							isHovering={isHovering}
							setIsHovering={setIsHovering}
							currentColor={currentColor}
						/>
					</div>
				</Dialog>
			</div>
		</ClientSidePortal>
	);
};

const mapStateToProps = (state, props) => ({
	props: props,
	UI: state.UI,
});

export default connect(mapStateToProps)(AdminTileColorDropdown);
