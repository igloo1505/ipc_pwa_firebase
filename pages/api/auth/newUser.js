// const mongoose = require("mongoose");
import uuid from "uuid";
import nc from "next-connect";
import { connectDB } from "../../../utils/connectDB";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import User from "../../../models/User";
// import NextCors from "nextjs-cors";
// import { handleRememberMe } from "../../../util/handleRememberMe";

import colors from "colors";

const handler = nc();

const tokenExpirationInHours = 24;

handler.post(async (req, res) => {
	try {
		const cookies = new Cookies(req, res);
		let { email, password, firstName, lastName, allowEmails } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			return res.json({
				success: false,
				message: "User already exists",
				UIMessage: "User already exists",
			});
		}
		let newUser = new User({
			email,
			password,
			firstName,
			lastName,
			allowEmails,
		});

		let savedUser = await newUser.save();
		savedUser = savedUser.toObject();
		delete savedUser.password;
		let token = jwt.sign(
			{
				_id: savedUser._id,
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * tokenExpirationInHours,
			},
			process.env.JWT_SECRET
		);
		cookies.set("token", token);
		// if (req.body.rememberMe) {
		//     await handleRememberMe(user, req, cookies);
		//   }
		return res.json({
			success: true,
			message: "User created",
			UIMessage: "User created",
			user: savedUser,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "There was an error logging in." });
	}
});

export default connectDB(handler);
