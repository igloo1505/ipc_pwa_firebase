const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSettingsSchema = mongoose.Schema(
	{
		allowEmails: {
			type: Boolean,
			default: true,
		},
		customTileColors: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "CustomTileColor",
			required: false,
			autopopulate: true,
		},
	},
	{ timestamps: true }
);

UserSettingsSchema.plugin(require("mongoose-autopopulate"));

module.exports =
	mongoose.models?.UserSettings ||
	mongoose.model("UserSettings", UserSettingsSchema);
