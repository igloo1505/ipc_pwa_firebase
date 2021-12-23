function rgbToHsl(r, g, b) {
	(r /= 255), (g /= 255), (b /= 255);
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h,
		s,
		l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return {
		js: [h, s, l],
		css: [h * 360, s * 100, l * 100],
	};
}

export const getHSL = (color) => {
	if (String(color).slice(0, 4) === "rgba") {
		const rgba = color.slice(5, -1).split(",");

		const hsl = rgbToHsl(rgba[0], rgba[1], rgba[2]);

		return hsl;
	}
	if (String(color).slice(0, 3) === "rgb") {
		const rgb = color.slice(4, -1).split(",");

		const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
		return hsl;
	}
	if (String(color).slice(0, 1) === "#") {
		const hex = color.slice(1);
		let _r, _g, _b;
		if (hex.length === 3) {
			_r = parseInt(`${hex[0]}`, 8);
			_g = parseInt(`${hex[1]}`, 8);
			_b = parseInt(`${hex[2]}`, 8);
		}
		if (hex.length === 6) {
			_r = parseInt(`${hex[0]}${hex[1]}`, 16);
			_g = parseInt(`${hex[2]}${hex[3]}`, 16);
			_b = parseInt(`${hex[4]}${hex[5]}`, 16);
		}

		const hsl = rgbToHsl(_r, _g, _b);

		return hsl;
	}
};
