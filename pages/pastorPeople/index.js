import React from "react";
import styles from "../../styles/pastorPeople.module.scss";
import AdminLoginCard from "../../components/admin/adminLoginCard";
import AdminAuthenticatedIndex from "../../components/admin/AdminAuthenticatedIndex";
import { connect } from "react-redux";

const pastorPeople = ({ access: { authenticated: isAuthenticated } }) => {
	return (
		<div className={styles.pastorPeopleMainContainer}>
			{isAuthenticated ? <AdminAuthenticatedIndex /> : <AdminLoginCard />}
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	access: state.access,
	props: props,
});

export default connect(mapStateToProps)(pastorPeople);
