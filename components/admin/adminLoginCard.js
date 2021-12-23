import React, { useState, useEffect } from "react";
import { Button, Checkbox, TextInputField } from "evergreen-ui";
import styles from "../../styles/adminLoginCard.module.scss";
import AdminLoginCardBanner from "./adminLoginCardBanner";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import clsx from "clsx";
import { authenticate } from "../../state/actions/userActions";
import { connect } from "react-redux";
import gsap from "gsap";

const slidingContainerId = "adminLoginCard-sliding-container";

const adminLoginCard = ({ authenticate }) => {
	const [shouldHidePassword, setShouldHidePassword] = useState(true);
	const [validate, setValidate] = useState({
		email: true,
		password: true,
	});
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
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

	useEffect(() => {
		animateEntrance();
	}, []);

	return (
		<div className={styles.adminCardOuter} id={slidingContainerId}>
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
						isInvalid={!validate.email}
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
							isInvalid={!validate.password}
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
					<div className={styles.rememberMeContainer}>
						<Checkbox
							checked={formData.rememberMe}
							label="Remember Me"
							onChange={() =>
								setFormData({
									...formData,
									rememberMe: !formData.rememberMe,
								})
							}
							margin="16px"
						/>
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

const animateEntrance = () => {
	gsap.from(`#${slidingContainerId}`, {
		y: -400,
		duration: 1,
		scale: 0.3,
		opacity: 0,
		ease: "power3.inOut",
	});
};
