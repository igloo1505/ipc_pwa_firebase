import nc from "next-connect";
import { connectDB } from "../../../utils/connectDB";
import Cookies from "cookies";
import User from "../../../models/User";
import UIMessage from "../../../models/local/UIMessage";
import UserMessage from "../../../models/UserMessage";
import UserReadState from "../../../models/UserReadState";
import colors from "colors";
import { handleAuth } from "../../../utils/handleCookies";

const handler = nc();

handler.post(async (req, res) => {
	try {
		let { sender, recipients, message } = req.body;
		const cookies = new Cookies(req, res);
		let user = await User.findById(sender);

		if (!user) {
			let uiMessage = new UIMessage("User not found", "error");
			return res.json({
				success: false,
				message: "User not found.",
				UIMessage: uiMessage,
			});
		}
		let _auth = handleAuth(cookies, user);
		if (_auth.success === false) {
			let _uiMessage = new UIMessage("Try logging in again.", "error");

			return res.json({
				success: false,
				message: "User not authenticated.",
				UIMessage: _uiMessage,
			});
		}

		let _recipients = recipients.map(async (recipient) => {
			console.log(
				colors.bgRed.black("recipients on inside of _recipients: ", recipient)
			);
			let _user = await User.findById(recipient);

			if (_user) {
				let newUserReadState = new UserReadState({
					recipient: _user._id,
				});
				let savedUserReadState = await newUserReadState.save();
				return savedUserReadState._id;
			}
		});
		let _recipientsIds = await Promise.all(_recipients);

		let newMessage = new UserMessage({
			sender: sender,
			recipients: _recipientsIds,
			message: message,
		});

		let savedMessage = await newMessage.save();

		// TODO: add notification here to pwa of recipients once socket.io is implemented

		return res.json({
			success: true,
			message: savedMessage,
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: "There was an error authorizing that action." });
	}
});

export default connectDB(handler);
