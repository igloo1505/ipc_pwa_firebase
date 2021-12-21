import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/ColorOption.module.scss";
import Image from "next/image";
import colorSelectImage from "../../public/publicAssets/colorSelectionImageOne.jpg";
import ImageColorSelectCanvas from "../general/ImageColorSelectCanvas";
import clsx from "clsx";

const canvasId = "colorSelectCanvas";
const imageId = "colorSelectImage";
const paintScale = 0.5;
const ColorOption = ({ colorOption, isHovering, setIsHovering }) => {
	let canvas = useRef(null);
	let img = useRef(null);
	const [additionalStyles, setAdditionalStyles] = useState({});

	useEffect(() => {
		if (typeof window === "undefined") return;
		let _canvas = document.getElementById(canvasId);
		if (!_canvas) return;
		// debugger;
		let canvasSize = _canvas.getBoundingClientRect();
		let ctx = _canvas.getContext("2d");
		let imgEm = document.getElementById(imageId);
		let size = {};
		if (imgEm.naturalWidth < imgEm.naturalHeight) {
			// debugger;
			size.width = canvasSize.width;
			// size.width = imgEm.naturalWidth * (canvasSize.width / imgEm.naturalWidth);
			// size.width = imgEm.naturalWidth;
			size.height = imgEm.naturalHeight;
			size.height = (imgEm.naturalWidth / size.width) * imgEm.naturalHeight;
			console.log("size: ", size);
		}

		// if (imgEm.naturalWidth > imgEm.naturalHeight) {
		// if (true) {
		// size.height = canvasSize.height;
		// size.width = (imgEm.naturalHeight / size.height) * imgEm.naturalWidth;
		// size.height = imgEm.naturalHeight;
		// size.width = imgEm.naturalWidth;
		// }

		ctx.drawImage(
			document.getElementById(imageId),
			0,
			0,
			size.width,
			size.height
		);
		ctx.scale(5.3, size.height / imgEm.naturalHeight);
	}, []);

	useEffect(() => {
		let ns = {};
		if (isHovering) {
			// ns.border = "1px solid #fff4";
			ns.boxShadow = "5px 5px 10px #8b8b8b, -5px -5px 10px #ffffff";
		}
		if (!isHovering) {
			// ns.border = "1px solid transparent";
			ns.boxShadow = "none";
		}
		setAdditionalStyles(ns);
	}, [isHovering]);

	const useCanvas = (el, image, callback) => {
		el = document.getElementById(canvasId);
		if (!image) {
			image = document.getElementById(imageId);
		}

		el.width = image.width;
		el.height = image.height;
		el.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
		return callback();
	};

	const handleMouseMovement = (e) => {
		let x, y;
		if (e.offsetX) {
			x = e.offsetX;
			y = e.offsetY;
		} else if (e.layerX) {
			x = e.layerX;
			y = e.layerY;
		}

		// useCanvas(canvas.current, img.current, function () {
		// 	// let ctx = canvas.current.getContext("2d");
		//
		// 	let ctx = document.getElementById(canvasId).getContext("2d");
		// 	var p = ctx.getImageData(x, y, 1, 1).data;
		//
		// 	preview.style.background = rgbToHex(p[0], p[1], p[2]);
		// });
	};

	// const handleImageClick = (e) => {
	// 	if (e.offsetX) {
	// 		x = e.offsetX;
	// 		y = e.offsetY;
	// 	} else if (e.layerX) {
	// 		x = e.layerX;
	// 		y = e.layerY;
	// 	}
	//
	// 	// useCanvas(canvas.current, img.current, () => {
	// 	//
	// 	// 	var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data;
	// 	// 	result.innerHTML =
	// 	// 		"<span>HEX: " +
	// 	// 		rgbToHex(p[0], p[1], p[2]) +
	// 	// 		"</span>" +
	// 	// 		"<span>RGB:  rgb(" +
	// 	// 		p[0] +
	// 	// 		"," +
	// 	// 		p[1] +
	// 	// 		"," +
	// 	// 		p[2] +
	// 	// 		")</span>";

	// 	// 	document.body.style.background = rgbToHex(p[0], p[1], p[2]);
	// 	// });

	// 	function _(el) {
	// 		return document.querySelector(el);
	// 	}

	// 	function componentToHex(c) {
	// 		var hex = c.toString(16);
	// 		return hex.length == 1 ? "0" + hex : hex;
	// 	}
	// 	function rgbToHex(r, g, b) {
	// 		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	// 	}

	// 	function findPos(obj) {
	// 		var curleft = 0,
	// 			curtop = 0;
	// 		if (obj.offsetParent) {
	// 			do {
	// 				curleft += obj.offsetLeft;
	// 				curtop += obj.offsetTop;
	// 			} while ((obj = obj.offsetParent));
	// 			return { x: curleft, y: curtop };
	// 		}
	// 		return undefined;
	// 	}
	// };

	const setCanvas = () => {
		if (typeof window === "undefined") return;
		let target = document.getElementById(imageId).getBoundingClientRect();

		console.log("setCanvas: ", target);
	};

	return (
		<div
			className={styles.colorOptionOuter}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onMouseMove={(e) => handleMouseMovement(e)}
			style={additionalStyles}
		>
			<ImageColorSelectCanvas
				canvasClassName={styles.colorOptionCanvas}
				canvasId={canvasId}
				targetEmId={imageId}
				canvasRef={canvas}
			/>
			<Image
				src={colorSelectImage}
				ref={img}
				alt="Custom Color Selection"
				layout="responsive"
				placeholder="blur"
				className={clsx(styles.colorOptionImage, "color-select-image")}
				id={imageId}
				priority
				onClick={setCanvas}
				onLoadingComplete={setCanvas}
			/>
		</div>
	);
};
export default ColorOption;
