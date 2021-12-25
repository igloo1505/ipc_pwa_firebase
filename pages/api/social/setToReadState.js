import nc from "next-connect";
import { connectDB } from "../../../utils/connectDB";
import Cookies from "cookies";
import User from "../../../models/User";
import UIMessage from "../../../models/local/UIMessage";
import UserMessage from "../../../models/UserMessage";
import colors from "colors";
import { handleAuth } from "../../../utils/handleCookies";

const handler = nc();

handler.post(async (req, res) => {
	try {
		const { reader, messageId } = req.body;
		console.log("messageId: ", messageId);
		let message = await UserMessage.findById(messageId);
		console.log("message: ", message);
		if (!message) {
			const _UiMessage = new UIMessage(
				"An error occurred finding that message.",
				"error"
			);
			return res.json({
				success: false,
				message: "Message not found.",
				UIMessage: _UiMessage,
			});
		}

		let savedMessage = await message.setToRead(reader);
		console.log(colors.bgRed.black("savedMessage: ", savedMessage));

		return res.json({
			success: true,
			message: savedMessage,
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "There was an error authorizing that action." });
	}
});

export default connectDB(handler);
