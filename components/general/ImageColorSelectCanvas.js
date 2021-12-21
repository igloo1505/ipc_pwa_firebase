import React, { useEffect, useState } from "react";
import ClientSidePortal from "./ClientSidePortal";
import styles from "../../styles/canvas.module.scss";
const ImageColorSelectCanvas = ({
	canvasClassName,
	canvasId,
	canvasRef,
	targetEmId,
}) => {
	const [positionStyles, setPositionStyles] = useState({});
	useEffect(() => {
		if (typeof window === "undefined") return;
		console.log("canvasId: ", canvasId);
		let target = document.getElementById(targetEmId);
		let canvas = document.getElementById(canvasId);
		if (!canvas || !target) return;
		let tDims = target.getBoundingClientRect();
		let cDims = canvas.getBoundingClientRect();
		let ctx = canvas.getContext("2d");
		let newPositionStyles = {};
		console.log("canvas down here: ", canvas);
		// newPositionStyles.top = tDims.top - cDims.top;
		// newPositionStyles.top = tDims.top;
		// newPositionStyles.left = tDims.left;
		newPositionStyles.height = tDims.height;
		newPositionStyles.width = tDims.width;
		newPositionStyles.zIndex = 999;
		console.log("newPositionStyles: ", newPositionStyles);
		setPositionStyles(newPositionStyles);
	}, [canvasId]);

	return (
		// <ClientSidePortal>
		<canvas
			style={positionStyles}
			id={canvasId}
			ref={canvasRef}
			className={styles.canvasMain}
		/>
		// </ClientSidePortal>
	);
};

export default ImageColorSelectCanvas;
