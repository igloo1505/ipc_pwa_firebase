import React, { useState } from "react";
import { Button, TextInputField } from "evergreen-ui";
import styles from "../../styles/adminLoginCard.module.scss";
import AdminLoginCardBanner from "./adminLoginCardBanner";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import clsx from "clsx";

const adminLoginCard = () => {
	const [shouldHidePassword, setShouldHidePassword] = useState(true);
	const handleIconClick = () => {
		setShouldHidePassword(!shouldHidePassword);
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
					/>
					<div className={styles.passwordInputWrapper}>
						<TextInputField
							id="ids-are-optional"
							label="Password"
							required
							// description="This is a description."
							placeholder={"password"}
							className={styles.adminCardInput}
							width="100%"
							type={shouldHidePassword ? "password" : "text"}
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
					<Button marginRight={16} appearance="primary" intent="primary">
						Login
					</Button>
				</div>
			</div>
		</div>
	);
};

export default adminLoginCard;
