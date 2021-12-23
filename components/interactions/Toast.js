import React, { useEffect, useState } from "react";
import { Button, Alert, Pane } from "evergreen-ui";
import styles from "../../styles/Toast.module.scss";
import { connect, useDispatch } from "react-redux";
import { a as web } from "@react-spring/web";
import { config, useSpring } from "@react-spring/core";
import * as Types from "../../state/TYPES";
import { getHSL } from "../../utils/getHSLcolor";
import {
	red,
	blue,
	purple,
	yellow,
	amber,
	orange,
	green,
} from "material-ui-colors";
import clsx from "clsx";
import { MdDangerous, MdWarning, MdOutlineClose } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { GiInfo } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import store from "../../state/store";

let VariantHasIcon = {
	danger: MdDangerous,
	info: GiInfo,
	success: BsCheckCircleFill,
	warning: MdWarning,
	social: FaUserFriends,
	colorUpdate: IoIosColorPalette,
	// success:MdCheck,
};

let iconContainerId = "icon-container-notificationt-toast";

const temporaryDispatchFakeToast = () => {
	store.dispatch({
		type: Types.SHOW_TOAST_NOTIFICATION,
		payload: {
			shouldShow: true,
			message: "Test title right here",
			description:
				"adipiscing elits, sed dod eiusmod tempor incididunt ut labore et dolore magna aliqua. Test with exactly 141 characters just out of principle.",
			variant: "social",
			timeout: 3000,
			additionalProps: {},
		},
	});
};

const setIconColor = () => {
	if (typeof window === "undefined") return;
	let em = document.getElementById(iconContainerId).childNodes[0];
};

const handleVariantState = (_variant, additionalProps) => {
	console.log("_variant, additionalProps: ", _variant, additionalProps);
	switch (_variant) {
		case "success":
			return {
				mainDiv: {
					border: `1px solid ${green[500]}`,
					backgroundColor: green[100],
				},
				titleDiv: {
					color: green[800],
				},
				iconSvg: {
					color: green[800],
				},
			};

		case "warning":
			return {
				mainDiv: {
					border: `1px solid ${yellow[500]}`,
					backgroundColor: yellow[100],
				},
				titleDiv: {
					color: yellow[800],
				},
				iconSvg: {
					color: yellow[800],
				},
			};

		case "info":
			return {
				mainDiv: {
					border: `1px solid ${blue[500]}`,
					backgroundColor: blue[100],
				},
				titleDiv: {
					color: blue[800],
				},
				iconSvg: {
					color: blue[800],
				},
			};

		case "social":
			return {
				mainDiv: {
					border: `1px solid ${blue[500]}`,
					backgroundColor: "#1b438a",
				},
				titleDiv: {
					// color: blue[800],
					color: "#fff",
				},
				bodyDiv: {
					color: "#fffc",
				},
				iconSvg: {
					color: "#f04235",
				},
			};

		case "danger":
			return {
				mainDiv: {
					border: `1px solid ${red[500]}`,
					backgroundColor: red[100],
				},
				titleDiv: {
					color: red[800],
				},
				iconSvg: {
					color: red[800],
				},
			};

		case "colorUpdate":
			let bgHSL = getHSL(additionalProps.background);
			let textHSL = getHSL(additionalProps.text);
			console.log("bgHSL: ", bgHSL, textHSL);
			return {
				mainDiv: {
					border: `1px solid hsl(${bgHSL.css[0] - 30}deg, ${bgHSL.css[1]}%, ${
						bgHSL.css[2]
					}%)`,
					backgroundColor: additionalProps.background,
				},
				titleDiv: {
					color: additionalProps.text,
				},
				bodyDiv: {
					color: additionalProps.text,
				},
				iconSvg: {
					color: additionalProps.text,
				},
				closeIcon: {
					color: additionalProps.text,
				},
			};

		default:
			return {
				mainDiv: {},
				innerDiv: {},
				titleDiv: {},
				bodyDiv: {},
				iconContainer: {},
			};
	}
};

const Toast = ({
	toast: {
		shouldShow,
		message,
		description,
		variant,
		timeout = 3000,
		additionalProps,
	},
}) => {
	const dispatch = useDispatch();
	const [Icon, setIcon] = useState(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			document.addEventListener("keyup", (e) => {
				if (e.code === "Space") {
					temporaryDispatchFakeToast();
				}
			});
		}
	}, []);

	const springStyles = useSpring({
		opacity: shouldShow ? 1 : 0,
		transform: shouldShow ? "translate(-50%, 0)" : "translate(-50%, -100%)",
		config: config.stiff,
	});
	const [variantState, setVariantState] = useState({
		mainDiv: {},
		innerDiv: {},
		titleDiv: {},
		bodyDiv: {},
		closeIcon: {},
	});

	useEffect(() => {
		let newState = handleVariantState(variant, additionalProps);
		setVariantState(newState);
		if (VariantHasIcon[variant]) {
			setIcon(variant);
		}
		if (!VariantHasIcon[variant]) {
			setIcon(null);
		}
		if (shouldShow) {
			setTimeout(() => {
				closeToast();
			}, timeout);
		}
	}, [shouldShow, message, description, variant, timeout, additionalProps]);

	const closeToast = () => {
		dispatch({
			type: Types.CANCEL_TOAST_NOTIFICATION,
		});
	};

	return (
		<web.div
			className={clsx(
				styles.mainDiv,
				shouldShow
					? styles.toast_main_container
					: styles.toast_main_container_hidden
			)}
			style={{ ...variantState.mainDiv, ...springStyles }}
			// style={variantState.mainDiv}
		>
			<div
				className={clsx(styles.closeIcon, styles[`closeIcon-${variant}`])}
				onClick={closeToast}
				style={variantState.closeIcon}
			>
				<MdOutlineClose />
			</div>
			<div className={styles.leftWrapper}>
				{Icon && (
					<div
						className={styles.iconContainer}
						id={iconContainerId}
						style={variantState.iconContainer}
					>
						{(() => {
							let IconN = VariantHasIcon[Icon];

							return (
								<IconN
									className={styles.icon}
									id={`notification-icon-${variant}`}
									style={variantState.iconSvg}
								/>
							);
						})()}
					</div>
				)}
			</div>
			<div style={variantState.innerDiv} className={styles.innerDiv}>
				<div style={variantState.titleDiv} className={styles.titleDiv}>
					{message}
				</div>

				<div style={variantState.bodyDiv} className={styles.bodyDiv}>
					{description}
				</div>
			</div>
		</web.div>
	);
};

const mapStateToProps = (state, props) => ({
	toast: state.UI?.notifications?.toast,
	props: props,
});

export default connect(mapStateToProps)(Toast);
