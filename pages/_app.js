import React, { useEffect } from "react";

import "../styles/globals.scss";
import Navbar from "../components/navigation/Navbar";
import Drawer from "../components/navigation/Drawer";
import { Provider } from "react-redux";
import store from "../state/store";
import * as Types from "../state/TYPES";

function MyApp({ Component, pageProps }) {
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
			<Navbar />
			<Drawer />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
