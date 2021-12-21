import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import styles from "../../../styles/ColorPicker.module.scss";
import * as Types from "../../../state/TYPES";
import {
	AlphaPicker,
	BlockPicker,
	ChromePicker,
	CirclePicker,
	CompactPicker,
	GithubPicker,
	HuePicker,
	MaterialPicker,
	PhotoshopPicker,
	SketchPicker,
	SliderPicker,
	SwatchesPicker,
	TwitterPicker,
} from "react-color";
import { Dialog } from "evergreen-ui";

const defaultCurrentColor = "#c71f3a";
const defaultCurrentTextColor = "#fff";

const ColorPicker = ({ UI: { shouldShow, tileId, currentColor } }) => {
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const [currentColorSettings, setCurrentColorSettings] = useState({
		background: defaultCurrentColor,
		text: defaultCurrentTextColor,
	});
	useEffect(() => {
		setVisible(shouldShow);
		// if (currentColor) {
		// 	setTitleBackgroundColor({currentColor});
		// }
		// if (!currentColor) {
		// 	setTitleBackgroundColor(defaultCurrentColor);
		// }
	}, [shouldShow]);

	const closeColorSelect = () => {
		dispatch({
			type: Types.CLOSE_COLOR_SELECT,
		});
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
	const onChangeComplete = (e) => {};

	return (
		<Dialog
			isShown={true}
			onCloseComplete={() => closeColorSelect(false)}
			preventBodyScrolling
			confirmLabel="Change"
			hasHeader={false}
			padding="0"
			contentContainerProps={{ padding: "0" }}
		>
			<div
				className={styles.dialogTitle}
				style={{ backgroundColor: currentColorSettings.background }}
			>
				<div
					className={styles.dialogTitleText}
					style={{ color: currentColorSettings.text }}
				>
					Set a custom color:
				</div>
			</div>
			<div className={styles.mainDialogContentContainer}>
				<div className={styles.colorPickerTileContainer}>
					<div className={styles.subtitleContainer}>Button Color</div>
					<div className={styles.colorPickerTileContainerInner}>
						<HuePicker
							onChange={(e) => handleHueChange(e, "background")}
							onChangeComplete={(e) => onChangeComplete(e, "background")}
							color={currentColorSettings.background}
							name="background"
						/>
						<AlphaPicker
							onChange={(e) => handleAlphaChange(e, "background")}
							onChangeComplete={(e) => onChangeComplete(e, "background")}
							color={currentColorSettings.background}
							name="background"
						/>
					</div>
				</div>
				<div className={styles.colorPickerTileContainer}>
					<div className={styles.subtitleContainer}>Text Color</div>
					<div className={styles.colorPickerTileContainerInner}>
						<HuePicker
							onChange={(e) => handleHueChange(e, "text")}
							onChangeComplete={(e) => onChangeComplete(e, "text")}
							color={currentColorSettings.text}
							name="text"
						/>
						<AlphaPicker
							onChange={(e) => handleAlphaChange(e, "text")}
							onChangeComplete={(e) => onChangeComplete(e, "text")}
							color={currentColorSettings.text}
							name="text"
						/>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

const mapStateToProps = (state, props) => ({
	props: props,
	UI: state.UI,
});

export default connect(mapStateToProps)(ColorPicker);
