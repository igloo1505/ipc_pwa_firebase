const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const CustomColorSetting = require("./CustomColorSetting");
const colors = require("colors");
const User = require("./User");

const UserReadStateSchema = mongoose.Schema(
	{
		recipient: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		readStatus: {
			type: Boolean,
			default: false,
		},
		readDate: {
			type: Date,
			default: null,
		},
		sendDate: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true }
);

UserReadStateSchema.methods.setToRead = async function (readingUserId, next) {
	let _reader = User.findById(id);
};

module.exports =
	mongoose.models?.UserReadState ||
	mongoose.model("UserReadState", UserReadStateSchema);
