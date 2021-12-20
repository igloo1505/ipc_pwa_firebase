// const mongoose = require("mongoose");
import uuid from "uuid";
import nc from "next-connect";
import { connectDB } from "../../../utils/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
// import NextCors from "nextjs-cors";
// import { handleRememberMe } from "../../../util/handleRememberMe";

import colors from "colors";
import { handleCookies, handleAuth } from "../../../utils/handleCookies";

const handler = nc();

handler.post(async (req, res) => {
	try {
		const cookies = new Cookies(req, res);
		let { email, password } = req.body;
		let user = await User.findOne({ email });

		if (!user) {
			return res.json({
				success: false,
				message: "User not found.",
				UIMessage: {
					text: "User not found :(",
					type: "error",
				},
			});
		}

		// TODO check valid token here
		handleAuth(cookies, user);

		let correctPassword = await user.comparePassword(password);
		if (!correctPassword) {
			return res.statusCode(401).json({
				success: false,
				message: "Incorrect password.",
				UIMessage: "Incorrect password.",
			});
		}

		handleCookies(cookies, user);

		// if (req.body.rememberMe) {
		//     await handleRememberMe(user, req, cookies);
		//   }

		return res.json({
			success: true,
			message: "Authentication successful.",
			UIMessage: "You're in!",
			user: user,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "There was an error logging in." });
	}
});

export default connectDB(handler);
