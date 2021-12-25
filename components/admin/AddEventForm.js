import React, { useEffect } from "react";
import { TextInputField } from "evergreen-ui";
import styles from "../../styles/AddEventForm.module.scss";
import gsap from "gsap";

const containerId = "addEventFormContainer";

const AddEventForm = ({ tabs, activeTabIndex }) => {
	useEffect(() => {
		if (tabs[activeTabIndex].key === "addEvent") {
			animateEntrance();
		}
	}, [tabs, activeTabIndex]);

	const handleUpload = () => {
		const formData = new FormData();
		formData.append("recipeImage", image);
		formData.append("recipeId", relevantId);
		formData.append("userId", userId);
	};

	// TODO resume here... forgot to fix the mother loving drawer
	return (
		<div className={styles.outerContainer} id={containerId}>
			<div className={styles.titleContainer}>New Carousel Event</div>
			<div className={styles.inputsContainer}>
				<TextInputField
					label="Event Name"
					description="Not public."
					placeholder="Join us!"
				/>
				<TextInputField
					label="Event Title"
					placeholder="Christmas at Immanuel"
				/>

				<TextInputField
					label="Link"
					description="Where to navigate when clicked."
					placeholder="Link"
				/>
			</div>
		</div>
	);
};

export default AddEventForm;

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
