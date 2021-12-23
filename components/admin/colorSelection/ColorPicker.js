import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import styles from "../../../styles/ColorPicker.module.scss";
import * as Types from "../../../state/TYPES";
import { AlphaPicker, HuePicker } from "react-color";
import { Dialog, Checkbox, Switch } from "evergreen-ui";
import { updateTileSettings } from "../../../state/actions/userActions";
import gsap from "gsap";

const defaultCurrentColor = "#c71f3a";
const defaultCurrentTextColor = "#fff";
const containerId = "color-picker-container";

const ColorPicker = ({
	UI: {
		colorSelect: { shouldShow, tileId, currentColor },
	},
	access: { user: userInState },
	updateTileSettings,
}) => {
	console.log("updateTileSettings: ", currentColor);
	const [visible, setVisible] = useState(false);
	const [isEditingText, setIsEditingText] = useState(false);
	const dispatch = useDispatch();
	const [currentColorSettings, setCurrentColorSettings] = useState({
		backgroundColor: defaultCurrentColor,
		textColor: defaultCurrentTextColor,
	});
	useEffect(() => {
		setVisible(shouldShow);
		if (currentColor?.textColor) {
			setIsEditingText(true);
		}
	}, [shouldShow]);

	useEffect(() => {
		setCurrentColorSettings({
			backgroundColor: currentColor?.backgroundColor,
			textColor: currentColor?.textColor,
		});
	}, [currentColor]);

	const closeColorSelect = () => {
		// animateExit(cb);
		setVisible(false);
		setTimeout(
			() =>
				dispatch({
					type: Types.CLOSE_COLOR_SELECT,
				}),
			500
		);
	};

	const handleHueChange = (e, _name) => {
		// console.log("hue e: ", e);
		setCurrentColorSettings({
			...currentColorSettings,
			[_name]: `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`,
		});
	};
	const handleAlphaChange = (e, _name) => {
		// console.log("e: ", e);
		setCurrentColorSettings({
			...currentColorSettings,
			[_name]: `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`,
		});
	};

	const saveColorSetting = () =>
		updateTileSettings({
			userId: userInState._id,
			tileId: tileId,
			colorSettings: {
				background: currentColorSettings.backgroundColor,
				text: currentColorSettings.textColor,
			},
		});

	const onChangeComplete = (e) => {
		console.log("Sending that *$&#* now");
		if (!userInState._id) {
			return;
		}
		console.log("tileId: ", tileId);
	};

	const handleToggleTextEdit = (e) => {
		let newCheckedValue = e.target.checked;
		console.log("newCheckedValue: ", newCheckedValue);
		setIsEditingText(!newCheckedValue);
		if (newCheckedValue) {
			setCurrentColorSettings({
				...currentColorSettings,
				textColor: currentColor?.textColor ?? defaultCurrentTextColor,
			});
		}
	};

	const handleFormConfirm = (e) => {
		saveColorSetting();
		closeColorSelect();
	};

	return (
		<Dialog
			isShown={visible}
			onCloseComplete={() => closeColorSelect(false)}
			preventBodyScrolling
			confirmLabel="Change"
			hasHeader={false}
			padding="0"
			contentContainerProps={{ padding: "0" }}
			onConfirm={handleFormConfirm}
			containerProps={{
				id: containerId,
				// margin: "50%",
			}}
		>
			<div
				className={styles.dialogTitle}
				style={{ backgroundColor: currentColorSettings.backgroundColor }}
			>
				<div
					className={styles.dialogTitleText}
					style={{ color: currentColorSettings.textColor }}
				>
					Set a custom color:
				</div>
			</div>
			<div className={styles.mainDialogContentContainer}>
				<div className={styles.colorPickerTileContainer}>
					<div className={styles.subtitleContainer}>Button Color</div>
					<div className={styles.colorPickerTileContainerInner}>
						<HuePicker
							onChange={(e) => handleHueChange(e, "backgroundColor")}
							onChangeComplete={(e) => onChangeComplete(e, "backgroundColor")}
							color={currentColorSettings.backgroundColor}
							name="backgroundColor"
						/>
						<AlphaPicker
							onChange={(e) => handleAlphaChange(e, "backgroundColor")}
							onChangeComplete={(e) => onChangeComplete(e, "backgroundColor")}
							color={currentColorSettings.backgroundColor}
							name="backgroundColor"
						/>
					</div>
				</div>
				<div className={styles.colorPickerTileContainerText}>
					<div className={styles.subtitleContainer}>Text Color</div>
					<div className={styles.toggleEditTextContainer}>
						<Switch
							checked={!isEditingText}
							label="Use Default Text"
							onChange={handleToggleTextEdit}
							id="useDefaultTextCheckbox"
						/>
						<div className={styles.switchLabelText}>Use default text color</div>
					</div>
					{isEditingText && (
						<div className={styles.colorPickerTileContainerInner}>
							<HuePicker
								onChange={(e) => handleHueChange(e, "textColor")}
								onChangeComplete={(e) => onChangeComplete(e, "textColor")}
								color={currentColorSettings?.textColor}
								name="textColor"
							/>
							<AlphaPicker
								onChange={(e) => handleAlphaChange(e, "textColor")}
								onChangeComplete={(e) => onChangeComplete(e, "textColor")}
								color={currentColorSettings?.textColor}
								name="textColor"
							/>
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

const mapStateToProps = (state, props) => ({
	props: props,
	UI: state.UI,
	access: state.access,
});

export default connect(mapStateToProps, { updateTileSettings })(ColorPicker);

const animateExit = () => {
	console.log("Closing animation here");
	// let emTop = document.getElementById(containerId).style.marginTop;
	console.log("emTop: ", emTop);
	gsap.to(`#${containerId}`, {
		duration: 0.3,
		y: -100,
		opacity: 0,
		ease: "bounce.out",
	});
};
