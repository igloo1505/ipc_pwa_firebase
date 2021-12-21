// const mongoose = require("mongoose");
import uuid from "uuid";
import nc from "next-connect";
import { connectDB } from "../../../utils/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import User from "../../../models/User";
import AccessRights from "../../../models/AccessRights";
import UserSettings from "../../../models/UserSettings";
// import NextCors from "nextjs-cors";
// import { handleRememberMe } from "../../../util/handleRememberMe";
import { handleCookies } from "../../../utils/handleCookies";
import UIMessage from "../../../models/local/UIMessage";
import colors from "colors";

const handler = nc();

handler.post(async (req, res) => {
	try {
		const cookies = new Cookies(req, res);
		let { email, password, firstName, lastName, allowEmails } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			let uiMessage = new UIMessage("User already exists", "error");
			return res.json({
				success: false,
				message: "User already exists",
				UIMessage: uiMessage,
			});
		}
		let newUser = new User({
			email,
			password,
			firstName,
			lastName,
			allowEmails,
		});
		let accessRights = new AccessRights();
		let userSettings = new UserSettings();
		newUser.accessRights = accessRights;
		newUser.userSettings = userSettings;

		let savedUser = await newUser.save();
		let savedAccessRights = await accessRights.save();

		let savedUserSettings = await userSettings.save();

		savedUser = savedUser.toObject();
		delete savedUser.password;
		handleCookies(cookies, savedUser);
		// if (req.body.rememberMe) {
		//     await handleRememberMe(user, req, cookies);
		//   }
		let otherUiMessage = new UIMessage("User created!", "success");
		return res.json({
			success: true,
			message: "User created",
			UIMessage: otherUiMessage,
			user: savedUser,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "There was an error creating that user." });
	}
});

export default connectDB(handler);
