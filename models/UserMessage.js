const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const CustomColorSetting = require("./CustomColorSetting");
const colors = require("colors");
const User = require("./User");

const UserMessageSchema = mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		recipients: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "UserReadState",
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

UserMessageSchema.plugin(require("mongoose-autopopulate"));

UserMessageSchema.methods.setToRead = async function (readingUserId) {
	// let _reader = User.findById(id);
	if (this.recipients.indexOf(readingUserId) === -1) {
		return "User not found";
	}
	this.recipients.forEach(async (recipientId) => {
		if (recipientId === readingUserId) {
			let toMarkRead = await UserReadState.findByIdAndUpdate(
				recipientId,
				{
					readStatus: true,
					readDate: Date.now(),
				},
				{
					new: true,
				}
			);
			return toMarkRead;
		}
	});
};

module.exports =
	mongoose.models?.UserMessage ||
	mongoose.model("UserMessage", UserMessageSchema);
