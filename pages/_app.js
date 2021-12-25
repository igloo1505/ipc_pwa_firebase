import React, { useEffect, useState } from "react";
import "../styles/globals.scss";
import Navbar from "../components/navigation/Navbar";
import Drawer from "../components/navigation/Drawer";
import { Provider } from "react-redux";
import store from "../state/store";
import * as Types from "../state/TYPES";
import ColorPicker from "../components/admin/colorSelection/ColorPicker";
import Toast from "../components/interactions/Toast";
import { ThemeProvider } from "evergreen-ui";
import defaultTheme from "../appData/defaultTheme";
// import AdminPanelLargeTile from "../components/admin/AdminPanelLargeTile";
// Bad idea and hugeeeee waste of time... maybe come back to it when I'm bored.
// import AdminTileColorDropdown from "../components/admin/AdminTileColorDropdown";

function MyApp({ Component, pageProps }) {
	const [shouldShowColorPicker, setShouldShowColorPicker] = useState(false);

	const stateListener = () => {
		let _store = store.getState();
		setShouldShowColorPicker(_store?.UI?.colorSelect?.shouldShow);
	};

	useEffect(() => {
		let cancel = store.subscribe(stateListener);
		return () => {
			cancel();
		};
	}, []);
	const setDims = () => {
		let w = window.innerWidth;
		let h = window.innerHeight;
		store.dispatch({
			type: Types.SET_VIEWPORT_DIMENSIONS,
			payload: {
				width: w,
				height: h,
			},
		});
	};
	useEffect(() => {
		if (typeof window !== "undefined") {
			setDims();
			window.addEventListener("resize", () => {
				setDims();
			});
		}
	}, []);
	return (
		<Provider store={store}>
			<div id="client-only-portal-target" />
			<Toast />
			<Navbar />
			{shouldShowColorPicker && <ColorPicker />}
			<Drawer />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
