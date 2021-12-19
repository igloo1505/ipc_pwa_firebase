import React from "react";
import styles from "../../styles/CarouselEvent.module.scss";

const CarouselEvent = ({ event, index, advanceCarousel }) => {
	return (
		<div
			className={styles.carouselEventOuterContainer}
			onClick={advanceCarousel}
		>{`Each Event here ${index}`}</div>
	);
};

export default CarouselEvent;
