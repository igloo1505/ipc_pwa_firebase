import React, { useState, useEffect } from "react";
import styles from "../../styles/tabbarTop.module.scss";
import { Tablist, Tab } from "evergreen-ui";
import Link from "next/link";

const Tabbar_top_carouselEvents = ({
	tabs,
	activeTabIndex,
	setActiveTabIndex,
}) => {
	return (
		<div className={styles.outerContainer}>
			<Tablist
				// marginBottom={16}
				flexBasis={240}
				marginTop={12}
				className={styles.tabList}
			>
				{tabs.map((tab, index) => (
					<Tab
						key={tab.key}
						id={tab.key}
						onSelect={() => setActiveTabIndex(index)}
						isSelected={index === activeTabIndex}
						aria-controls={`panel-${tab}`}
						className={styles.tab}
						href={`pastorPeople/carouselEvents/${tab.key}`}
					>
						{tab.displayText}
					</Tab>
				))}
			</Tablist>
		</div>
	);
};

export default Tabbar_top_carouselEvents;
