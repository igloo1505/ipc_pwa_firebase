import React, { useState, useEffect } from "react";
import styles from "../../styles/tabbarSide.module.scss";
import { Tablist, Tab } from "evergreen-ui";
import Link from "next/link";
import clsx from "clsx";

const tabbarSidePanel = ({ tabs, activeTabIndex, setActiveTabIndex }) => {
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
						className={clsx(
							styles.tab,
							styles[`tab-${tab.key}`],
							index === activeTabIndex && styles.activeTab
						)}
						href={`pastorPeople/carouselEvents/${tab.key}`}
						direction={"vertical"}
					>
						{tab.displayText}
					</Tab>
				))}
			</Tablist>
		</div>
	);
};

export default tabbarSidePanel;
