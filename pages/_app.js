import "../styles/globals.scss";
import Navbar from "../components/navigation/Navbar";
import Drawer from "../components/navigation/Drawer";
import { Provider } from "react-redux";
import store from "../state/store";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Navbar />
			<Drawer />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
