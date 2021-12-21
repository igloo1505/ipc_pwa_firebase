const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const CustomColorSetting = "./CustomColorSetting";

const UserSettingsSchema = mongoose.Schema(
	{
		allowEmails: {
			type: Boolean,
			default: true,
		},
		customTileColors: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "CustomColorSetting",
			required: false,
			autopopulate: true,
		},
	},
	{ timestamps: true }
);

UserSettingsSchema.plugin(require("mongoose-autopopulate"));

UserSettingsSchema.methods.clearTileSetting = async function (tileId, next) {
	let toRemove = this.customTileColors.filter((ct) => ct.tileId === tileId);
	this.customTileColors = this.customTileColors.filter(
		(ct) => ct.tileId !== tileId
	);
	toRemove.forEach(async (ct) => {
		await CustomColorSetting.findByIdAndDelete(ct._id);
	});
	await this.save();
};

module.exports =
	mongoose.models?.UserSettings ||
	mongoose.model("UserSettings", UserSettingsSchema);
