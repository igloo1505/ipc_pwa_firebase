import React from "react";
import { TextInputField, TextareaField, Button, Switch } from "evergreen-ui";

const StepTwo = ({ formData, setFormData, styles, handleFormChange }) => {
	return (
		<>
			<TextInputField
				label="Subtitle"
				placeholder="Every Sunday at 10am"
				name="subTitle"
				onChange={handleFormChange}
			/>
			<TextareaField
				isInvalid={false}
				label="Event Description"
				// hint="This is a hint. It's rendered under the textarea"
				// required
				// validationMessage="This field is required. It's only rendered when isInvalid is true."
				placeholder="We will be gathered at the church at 10am Sunday to celebrate the..."
				name="description"
				onChange={handleFormChange}
			/>
			<div className={styles.toggleShowSignatureContainer}>
				<div className={styles.switchLabelTextTopWrapper}>
					<div className={styles.switchLabelTextMain}>Show Signature</div>
					<Switch
						checked={formData.showSignature}
						label="Use Default Text"
						name="showSignature"
						id="useDefaultTextCheckbox"
						onChange={handleFormChange}
					/>
				</div>
				<div className={styles.switchLabelTextSubtext}>
					Your name will be visible as the author
				</div>
			</div>
		</>
	);
};

export default StepTwo;
