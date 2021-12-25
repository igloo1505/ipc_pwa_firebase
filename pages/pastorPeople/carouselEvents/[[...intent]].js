import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import styles from "../../../styles/carouselEventsPage.module.scss";
import Tabbar_side_carouselEvents from "../../../components/admin/Tabbar_side_carouselEvents";
import Tabbar_top_carouselEvents from "../../../components/admin/Tabbar_top_carouselEvents";
import ViewAllEvents from "../../../components/admin/ViewAllEvents";
import AddEvent from "../../../components/admin/AddEvent";
import EditActiveEvents from "../../../components/admin/EditActiveEvents";

const carouselEvents = ({
	UI: {
		viewport: { width: viewportWidth, height: viewportHeight },
	},
}) => {
	console.log("viewportWidth: ", viewportWidth);
	const router = useRouter();
	const [tabs, setTabs] = useState([
		{
			displayText: "View All",
			key: "viewAll",
		},
		{
			displayText: "Add Event",
			key: "addEvent",
		},
		{
			displayText: "Edit Active Events",
			key: "editActiveEvents",
		},
	]);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	useEffect(() => {
		let param = router.query.intent;
		console.log("params???: ", param);
		param ??= "viewAll";
		console.log("param: ", param);
		let _index = tabs.findIndex((tab) => tab.key === param[0]);
		if (_index === -1) _index = 0;
		setActiveTabIndex(_index);
	}, []);

	return (
		<div className={styles.mainContainer}>
			{viewportWidth > 1100 ? (
				<Tabbar_side_carouselEvents
					tabs={tabs}
					activeTabIndex={activeTabIndex}
					setActiveTabIndex={setActiveTabIndex}
				/>
			) : (
				<Tabbar_top_carouselEvents
					tabs={tabs}
					activeTabIndex={activeTabIndex}
					setActiveTabIndex={setActiveTabIndex}
				/>
			)}
			<div className={styles.mainContainerInner}>
				{activeTabIndex === 0 && (
					<ViewAllEvents tabs={tabs} activeTabIndex={activeTabIndex} />
				)}
				{activeTabIndex === 1 && (
					<AddEvent tabs={tabs} activeTabIndex={activeTabIndex} />
				)}
				{activeTabIndex === 2 && (
					<EditActiveEvents tabs={tabs} activeTabIndex={activeTabIndex} />
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	props: props,
});

export default connect(mapStateToProps)(carouselEvents);
