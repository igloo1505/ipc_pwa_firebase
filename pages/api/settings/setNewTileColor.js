// const mongoose = require("mongoose");
import uuid from "uuid";
import nc from "next-connect";
import { connectDB } from "../../../utils/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import User from "../../../models/User";
import CustomColorSetting from "../../../models/CustomColorSetting";
import UserSettings from "../../../models/UserSettings";
import UIMessage from "../../../models/local/UIMessage";
// import NextCors from "nextjs-cors";
// import { handleRememberMe } from "../../../util/handleRememberMe";
import { handleCookies, handleAuth } from "../../../utils/handleCookies";
import colors from "colors";

const handler = nc();

// "userId": "61c00c09a76bf7902a66a7b2",
// "tileId": "addNewAdministrator",
// "colorSettings": {
//     "background": "rgba(0 ,0, 0, 1)",
//     "text": "rgba(255, 255, 255, 1)"
// }

handler.post(async (req, res) => {
	try {
		const cookies = new Cookies(req, res);
		// console.log('req: ', req.body);
		let { userId, tileId, colorSettings } = req.body;
		let user = await User.findById(userId);
		let auth = handleAuth(cookies, user);
		console.log("auth: ".red, auth);
		if (!user || !auth.success) {
			let uiMessage = new UIMessage("User not found", "error");
			return res.json({
				success: false,
				message: "User not found.",
				UIMessage: uiMessage,
			});
		}
		console.log("User here nows".red, user);
		let newColorSetting = new CustomColorSetting({
			tileId: tileId,
			colors: {
				background: colorSettings.background,
				text: colorSettings.text,
			},
		});
		console.log("newColorSetting: ", newColorSetting);

		// TODO remove old mathing tileIds here
		console.log(
			"user.userSettings._id: ".blue,
			user.userSettings._id.toString()
		);
		let updatedUserSettings = await UserSettings.findByIdAndUpdate(
			user.userSettings._id.toString(),
			{
				// $pullAll: { customTileColors: [] },
				$push: { customTileColors: newColorSetting },
			},
			{ new: true }
		);

		console.log("updatedUserSettings: ".bgRed, updatedUserSettings);
		let uiMessage = new UIMessage("Color Updated!", "success");

		return res.json({
			success: true,
			message: "Color updated",
			UIMessage: uiMessage,
			updatedUserSettings,
		});
	} catch (error) {
		res.status(500).json({ error: "There was an error changing that setting" });
	}
});

export default connectDB(handler);
