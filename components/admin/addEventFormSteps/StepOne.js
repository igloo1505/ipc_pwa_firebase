import React from "react";
import { TextInputField, Button } from "evergreen-ui";

const StepOne = ({ formData, setFormData, styles, handleFormChange }) => {
	return (
		<>
			<TextInputField
				label="Event Name"
				description="Not public."
				placeholder="Join us!"
				name="name"
				onChange={handleFormChange}
			/>
			<TextInputField
				label="Event Title"
				placeholder="Christmas at Immanuel"
				name="title"
				onChange={handleFormChange}
			/>

			<TextInputField
				label="Link"
				description="Where to navigate when clicked."
				placeholder="Link"
				name="linkHref"
				onChange={handleFormChange}
			/>
		</>
	);
};

export default StepOne;
