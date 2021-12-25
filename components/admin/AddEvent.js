import React from "react";
import AddEventForm from "./AddEventForm";
import styles from "../../styles/AddEvent.module.scss";

const AddEvent = ({ tabs, activeTabIndex }) => {
	return (
		<div className={styles.addEventContainer}>
			<AddEventForm tabs={tabs} activeTabIndex={activeTabIndex} />
		</div>
	);
};

export default AddEvent;
