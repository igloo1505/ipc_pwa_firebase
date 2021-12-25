/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FilePicker } from "evergreen-ui";

const StepThree = ({ formData, setFormData, styles, handleFormChange }) => {
	const [image, setImage] = useState(null);

	const handleFormImageChnge = (e) => {
		// localStorage.setItem("newCarouselEventImage", e[0]);
		setImage(e[0]);
	};

	return (
		<>
			<div className={styles.stepThreeImagePreview}>
				{image && <img src={image} alt="Preview" />}
			</div>
			<FilePicker
				name="image"
				onChange={handleFormImageChnge}
				placeholder="Select an image"
			/>
		</>
	);
};

export default StepThree;
