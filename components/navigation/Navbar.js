/* eslint-disable @next/next/link-passhref */
import React, { useState } from "react";
import styles from "../../styles/Navbar.module.scss";
import { useDispatch, connect } from "react-redux";
import clsx from "clsx";
import { Spin as Hamburger } from "hamburger-react";
import * as Types from "../../state/TYPES";
import Link from "next/link";
import settings from "../../appData/appWideSettings";

const Navbar = ({
	UI: {
		navigation: {
			drawer: { isOpen: drawerIsOpen },
		},
		viewport: { width: viewportWidth, height: viewportHeight },
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
			<Link href={"/"}>
				<div className={styles.navbarTitleContainer}>
					<div className={styles.navbarTitleText}>IMMANUEL</div>
					<div className={styles.navbarSubtitleText}>presbyterian church</div>
				</div>
			</Link>
			{viewportWidth <= settings.navbarDrawerBreakpoint && (
				<div style={{ zIndex: 9999 }} id="navbar-hamburger">
					<Hamburger
						toggled={drawerIsOpen}
						toggle={handleBurgerClick}
						color={drawerIsOpen ? "#000" : "#fff"}
						direction="right"
						rounded
					/>
				</div>
			)}
			{viewportWidth > settings.navbarDrawerBreakpoint && (
				<div className={styles.navbarLinkSection}>
					{settings.navLinks.map((link, index) => {
						return (
							<Link key={`navbar-link-${index}`} href={link.href}>
								<div className={styles.navbarLink}>{link.displayString}</div>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	props: props,
	UI: state.UI,
});

export default connect(mapStateToProps)(Navbar);
