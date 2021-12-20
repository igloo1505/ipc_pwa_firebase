import React, { useState } from "react";
import { Button, TextInputField } from "evergreen-ui";
import styles from "../../styles/adminLoginCard.module.scss";
import AdminLoginCardBanner from "./adminLoginCardBanner";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import clsx from "clsx";
import { authenticate } from "../../actions/userActions";
import { connect } from "react-redux";

const adminLoginCard = ({ authenticate }) => {
	const [shouldHidePassword, setShouldHidePassword] = useState(true);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const handleIconClick = () => {
		setShouldHidePassword(!shouldHidePassword);
	};

	const handleLogin = () => {
		console.log("formData: ", formData);
		authenticate(formData);
	};
	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div className={styles.adminCardOuter}>
			<div className={styles.innerAdminCardContainer}>
				<AdminLoginCardBanner />
				<div className={styles.adminCardInner}>
					<TextInputField
						id="ids-are-optional"
						label="Email"
						required
						// description="This is a description."
						placeholder="St.Nicholas@immanuelwi.org"
						className={styles.adminCardInput}
						width="100%"
						type="email"
						onChange={handleChange}
						name="email"
					/>
					<div className={styles.passwordInputWrapper}>
						<TextInputField
							id="ids-are-optional"
							label="Password"
							name="password"
							required
							// description="This is a description."
							placeholder={"password"}
							className={styles.adminCardInput}
							width="100%"
							type={shouldHidePassword ? "password" : "text"}
							onChange={handleChange}
						/>
						{shouldHidePassword ? (
							<AiFillEyeInvisible
								onClick={handleIconClick}
								className={clsx(
									styles.togglePasswordIcon,
									styles.hidePasswordIcon
								)}
							/>
						) : (
							<BiShow
								onClick={handleIconClick}
								className={styles.togglePasswordIcon}
							/>
						)}
					</div>
				</div>
				<div className={styles.adminCardButtonContainer}>
					<Button
						marginRight={16}
						appearance="primary"
						intent="primary"
						onClick={handleLogin}
					>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	...state,
	props: props,
});

export default connect(mapStateToProps, { authenticate })(adminLoginCard);
