import React, { useEffect, useState } from "react";
import styles from "../../styles/AdminAuthenticatedIndex_mobile.module.scss";
import AdminPanelLargeTile from "./AdminPanelLargeTile";
import Tiles from "../../appData/AdminPanelTileOptions";

const staggeredEntranceClassName = "admin-tile-staggered-entrance";

const AdminAuthenticatedIndex_mobile = () => {
	const [tileOptions, setTileOptions] = useState([]);
	useEffect(() => {
		setTileOptions(Tiles);
		console.log("Tiles: ", Tiles, tileOptions);
	}, []);
	return (
		<div className={styles.adminMobileContainerOuter}>
			<div className={styles.adminMobileContainerInner}>
				{tileOptions.length > 0 &&
					tileOptions.map((tile, index) => {
						return (
							<AdminPanelLargeTile
								tile={tile}
								key={`admin-tile-panel-${index}`}
								gsapClassName={staggeredEntranceClassName}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default AdminAuthenticatedIndex_mobile;
