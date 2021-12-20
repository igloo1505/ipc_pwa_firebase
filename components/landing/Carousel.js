import React, { useEffect, useState } from "react";
import style from "../../styles/Carousel.module.scss";
import { to, useSpring } from "@react-spring/core";
import { config } from "react-spring";
import { a as web } from "@react-spring/web";
import CarouselEvent from "./CarouselEvent";

const pseudoEvents = [
	{
		content: {
			title: "event one",
			subTitle: "Subtitle one",
			description:
				"Random description that probably should have a character limit around 200 characters. one",
			showSignature: false,
		},
		linkHref: "www.igloodevelopment.dev",
		imgUrl: null,
		name: "One",
	},
	{
		content: {
			title: "event two",
			subTitle: "Subtitle two",
			description:
				"Random description that probably should have a character limit around 200 characters. two",
			showSignature: false,
		},
		linkHref: "www.igloodevelopment.dev",
		imgUrl: null,
		name: "Two",
	},
	{
		content: {
			title: "event three",
			subTitle: "Subtitle three",
			description:
				"Random description that probably should have a character limit around 200 characters. three",
			showSignature: false,
		},
		linkHref: "www.igloodevelopment.dev",
		imgUrl: null,
		name: "Three",
	},
];

const Carousel = () => {
	const [currentVisibleEvent, setCurrentVisibleEvent] = useState(0);
	const [events, setEvents] = useState([]);
	useEffect(() => {
		setEvents(pseudoEvents);
	}, []);
	const [styles, api] = useSpring(() => ({
		transform: "translateX(0px)",
		backgroundColor: "#fff",
		config: config.stiff,
	}));
	useEffect(() => {
		console.log("Running from click event");
		if (typeof window !== "undefined") {
			let _w = window.innerWidth;
			console.log("_w: ", _w, currentVisibleEvent);
			api.start({
				transform: `translateX(-${_w * currentVisibleEvent}px)`,
				// backgroundColor: "red",
				// onResolve: () => {
				// 	// debugger;
				// 	// setInitialVisibleSection(visibleSection);
				// },
			});
		}
	}, [api, currentVisibleEvent]);
	useEffect(() => {
		// api
		// document.addEventListener("scroll", (e) => {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// });
		// document.addEventListener("wheel", (e) => {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// 	if (e.deltaY > 20) {
		// 		// return setVisibleSection(1);
		// 	}
		// 	if (e.deltaY < -20) {
		// 		// return setVisibleSection(2);
		// 	}
		// });
		// document.addEventListener("touchmove", (e) => {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// });
	}, []);

	const advanceCarousel = () => {
		setCurrentVisibleEvent(
			currentVisibleEvent + 1 === pseudoEvents.length
				? 0
				: currentVisibleEvent + 1
		);
	};

	return (
		<div className={style.carouselOuterContainer}>
			<web.div
				className={style.carouselSlidingBit}
				style={{
					// position: "absolute",
					width: `${events.length}00vw`,
					height: "40vh",
					backgroundColor: "#fff",
					top: 0,
					left: 0,
					...styles,
				}}
			>
				{events.map((event, index) => {
					return (
						<CarouselEvent
							key={`carouselEvent-${index}`}
							event={event}
							index={index}
							advanceCarousel={advanceCarousel}
						/>
					);
				})}
			</web.div>
		</div>
	);
};

export default Carousel;
