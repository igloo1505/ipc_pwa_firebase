import React, { useState } from "react";
import styles from "../../styles/Navbar.module.scss";
import { useDispatch, connect } from "react-redux";
import clsx from "clsx";
import { Spin as Hamburger } from "hamburger-react";
import * as Types from "../../state/TYPES";

const Navbar = ({
	UI: {
		navigation: {
			drawer: { isOpen: drawerIsOpen },
		},
	},
}) => {
	// const [menuOpen, setMenuOpen] = useState(false);
	const dispatch = useDispatch();
	const handleBurgerClick = () => {
		dispatch({
			type: Types.TOGGLE_DRAWER,
		});
	};

	return (
		<div className={clsx(styles.navbarContainer)}>
			<div className={styles.navbarTitleContainer}>
				<div className={styles.navbarTitleText}>IMMANUEL</div>
				<div className={styles.navbarSubtitleText}>presbyterian church</div>
			</div>
			<div style={{ zIndex: 9999 }} id="navbar-hamburger">
				<Hamburger
					toggled={!drawerIsOpen}
					toggle={handleBurgerClick}
					color={!drawerIsOpen ? "#000" : "#fff"}
					direction="right"
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	props: props,
	UI: state.UI,
});

export default connect(mapStateToProps)(Navbar);
