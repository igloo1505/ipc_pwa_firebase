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
		<div
			className={clsx(
				styles.navbarContainer,
				drawerIsOpen && styles.resetShadow
			)}
		>
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
						return <LinkItem key={`navbar-link-${index}`} link={link} />;
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

const LinkItem = ({ link }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<Link href={link.href}>
			<div
				className={styles.navbarInnerWrapper}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				<div className={styles.navbarLink}>{link.displayString}</div>
				<div
					className={clsx(
						styles.navbarLinkBottomBorder,
						hovered && styles.navbarLinkBottomBorderHovered
					)}
				></div>
			</div>
		</Link>
	);
};
