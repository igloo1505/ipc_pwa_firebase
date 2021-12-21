const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const CustomColorSetting = require("./CustomColorSetting");
const colors = require("colors");

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

UserSettingsSchema.methods.replaceTileSetting = async function (
	newTileData,
	next
) {
	console.log("newTileData: here".america, newTileData);
	let toRemove = this.customTileColors.filter(
		(ct) => ct.tileId === newTileData.tileId
	);
	let newTileSet = this.customTileColors.filter(
		(ct) => ct.tileId !== newTileData.tileId
	);
	this.customTileColors = newTileSet;
	console.log("dis shit right here?!".america, this);
	debugger;
	let newCustomColorSetting = new CustomColorSetting({
		tileId: newTileData.tileId,
		colors: {
			background: newTileData.colorSettings.background,
			text: newTileData.colorSettings.text,
		},
	});
	console.log("down down baby?!".america, newCustomColorSetting);
	let savedCustomColorSetting = await newCustomColorSetting.save();
	console.log("dwayyyyy down?!".america, savedCustomColorSetting);

	toRemove.forEach(async (ct) => {
		console.log(`${CustomColorSetting}`.bgRed);
		await CustomColorSetting.findByIdAndDelete(ct._id);
		// await CustomColorSetting
	});

	this.customTileColors.push(newCustomColorSetting._id);
	newTileSet.push(newCustomColorSetting);
	console.log("newCustomColorSetting: ".america, this);
	await this.save();
	console.log("newTileSet: ", newTileSet);

	return newTileSet.map((ct) => ({
		colors: {
			background: ct.colors.background,
			text: ct.colors.text,
		},
		_id: ct._id,
		tileId: ct.tileId,
	}));
	// return this;
};

module.exports =
	mongoose.models?.UserSettings ||
	mongoose.model("UserSettings", UserSettingsSchema);
