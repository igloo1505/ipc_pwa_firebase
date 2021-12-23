import React, { useEffect, useState } from "react";
import { Button, Alert, Pane } from "evergreen-ui";
import styles from "../../styles/Toast.module.scss";
import { connect, useDispatch } from "react-redux";
import { a as web } from "@react-spring/web";
import { config, useSpring } from "@react-spring/core";
import * as Types from "../../state/TYPES";
import { red, blue, yellow, green } from "material-ui-colors";
import clsx from "clsx";
import { MdDangerous, MdWarning } from "react-icons/md";
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
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dod eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			variant: "danger",
			timeout: 3000,
			additionalProps: {},
		},
	});
};

const setIconColor = () => {
	if (typeof window === "undefined") return;
	let em = document.getElementById(iconContainerId).childNodes[0];
	console.log("em: ", em);
};

const handleVariantState = (_variant) => {
	console.log("_variant: ", _variant);
	switch (_variant) {
		case "success":
			return {
				mainDiv: {},
				innerDiv: {},
				titleDiv: {},
				bodyDiv: {},
			};

		case "warning":
			return {
				mainDiv: {},
				innerDiv: {},
				titleDiv: {},
				bodyDiv: {},
				iconContainer: {},
			};

		case "info":
			return {
				mainDiv: {},
				innerDiv: {},
				titleDiv: {},
				bodyDiv: {},
				iconContainer: {},
			};

		case "social":
			return {
				mainDiv: {},
				innerDiv: {},
				titleDiv: {},
				bodyDiv: {},
				iconContainer: {},
			};

		case "danger":
			return {
				mainDiv: {
					border: `2px solid ${red[500]}`,
					backgroundColor: red[100],
				},
				titleDiv: {
					color: red[800],
				},
				bodyDiv: {
					// color: red[700],
				},
				iconContainer: {
					"& > svg": {
						// color: red[800],
						color: green[800],
					},
				},
			};

		case "colorUpdate":
			return {
				mainDiv: {},
				innerDiv: {},
				titleDiv: {},
				bodyDiv: {},
				iconContainer: {},
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
		timeout,
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
	});

	useEffect(() => {
		let newState = handleVariantState(variant);
		setVariantState(newState);
		if (VariantHasIcon[variant]) {
			console.log("variantHasIcon[variant]: ", VariantHasIcon[variant]);
			setIcon(variant);
		}
		if (!VariantHasIcon[variant]) {
			setIcon(null);
		}
		if (shouldShow) {
		}
	}, [shouldShow, message, description, variant, timeout, additionalProps]);

	const closeToast = () => {
		dispatch({
			type: Types.CANCEL_TOAST_NOTIFICATION,
		});
	};

	console.log("Spring", springStyles);

	return (
		<web.div
			className={clsx(
				styles.mainDiv,
				shouldShow
					? styles.toast_main_container
					: styles.toast_main_container_hidden
			)}
			style={springStyles}
			// style={variantState.mainDiv}
		>
			<div className={styles.leftWrapper}>
				{Icon && (
					<div
						className={styles.iconContainer}
						id={iconContainerId}
						style={variantState.iconContainer}
					>
						{(() => {
							let IconN = VariantHasIcon[Icon];
							console.log("Icon: ", Icon);
							return <IconN className={styles.icon} onClick={closeToast} />;
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
