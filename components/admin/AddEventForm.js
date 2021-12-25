import React, { useEffect, useState } from "react";
import { TextInputField, Button } from "evergreen-ui";
import styles from "../../styles/AddEventForm.module.scss";
import gsap from "gsap";
import * as Types from "../../state/TYPES";
import StepOne from "./addEventFormSteps/StepOne";
import StepTwo from "./addEventFormSteps/StepTwo";
import StepThree from "./addEventFormSteps/StepThree";
import { connect, useDispatch } from "react-redux";

const containerId = "addEventFormContainer";

const AddEventForm = ({
	props: { tabs, activeTabIndex },
	access: { user: reduxUser },
}) => {
	const [activeFormStep, setActiveFormStep] = useState(0);

	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		name: "",
		linkHref: "",
		title: "",
		subTitle: "",
		description: "",
		subTitle: "",
		showSignature: false,
		author: null,
	});

	useEffect(() => {
		if (reduxUser) {
			setFormData({
				...formData,
				author: reduxUser._id,
			});
		}
	}, [reduxUser]);

	useEffect(() => {
		dispatch({
			type: Types.SYNC_ADD_EVENT_FORM_TO_REDUX,
			payload: formData,
		});
	}, [formData]);

	useEffect(() => {
		if (tabs[activeTabIndex].key === "addEvent") {
			animateEntrance();
		}
	}, [tabs, activeTabIndex]);

	const handleFormSubmission = () => {
		const formData = new FormData();
		formData.append("recipeImage", image);
		formData.append("recipeId", relevantId);
		formData.append("userId", userId);
	};

	const handleFormChange = (e) => {
		let newVal = e.target.value;
		if (e.target.name === "showSignature") {
			newVal = e.target.checked;
		}
		console.log("e: ", e);
		setFormData({
			...formData,
			[e.target.name]: newVal,
		});
	};

	const handleNextClick = () => {
		if (activeFormStep < 2) {
			setActiveFormStep(activeFormStep + 1);
		}
	};
	const handleBackClick = () => {
		if (activeFormStep > 0) {
			setActiveFormStep(activeFormStep - 1);
		}
	};

	// TODO resume here... forgot to fix the mother loving drawer
	return (
		<div className={styles.outerContainer} id={containerId}>
			<div className={styles.titleContainer}>New Carousel Event</div>
			<div className={styles.inputsContainer}>
				{activeFormStep === 0 && (
					<StepOne
						styles={styles}
						formData={formData}
						setFormData={setFormData}
						handleFormChange={handleFormChange}
					/>
				)}
				{activeFormStep === 1 && (
					<StepTwo
						styles={styles}
						formData={formData}
						setFormData={setFormData}
						handleFormChange={handleFormChange}
					/>
				)}
				{activeFormStep === 2 && (
					<StepThree
						styles={styles}
						formData={formData}
						setFormData={setFormData}
						handleFormChange={handleFormChange}
					/>
				)}
			</div>
			<div className={styles.buttonContainer}>
				<Button
					onClick={handleBackClick}
					marginRight={16}
					appearance="primary"
					intent="primary"
					disabled={activeFormStep === 0}
				>
					Back
				</Button>
				<Button
					onClick={handleNextClick}
					marginRight={16}
					appearance="primary"
					intent="primary"
				>
					Next
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	access: state.access,
	props: props,
});

export default connect(mapStateToProps)(AddEventForm);

const animateEntrance = () => {
	let tl = gsap.timeline();
	tl.fromTo(
		`#${containerId}`,
		{
			x: 100,
			// background: "#e0e0e0",
			// border: "1px solid #1f70cf",
			stagger: 0.1,
			ease: "elastic.out(1.7, 0.5)",
			duration: 1.5,
		},
		{
			// boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
			x: 0,
			// border: "1px solid #fffa",
			// padding: "0px",
			// background: "linear-gradient(145deg, #f0f0f0, #cacaca)",
			ease: "elastic.out(1.7, 0.5)",
			stagger: 0.1,
			duration: 1.5,
		}
	);
	tl.fromTo(
		`#${containerId}`,
		{
			// x: 100,
			// background: "#e0e0e0",
			// border: "1px solid #1f70cf",
			border: "1px solid transparent",
			boxShadow: "0px 0px 0px #bebebe",
			stagger: 0.1,
			ease: "elastic.out(1.3, 0.5)",
			duration: 0.3,
		},
		{
			boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
			border: "1px solid #fff",
			// x: 0,
			// border: "1px solid #fffa",
			// padding: "0px",
			// background: "linear-gradient(145deg, #f0f0f0, #cacaca)",
			ease: "power1.out",
			stagger: 0.1,
			duration: 0.35,
		},
		"-=0.35"
	);
};
