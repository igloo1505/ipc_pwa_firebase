const mongoose = require("mongoose");

const CustomColorSettingSchema = mongoose.Schema(
	{
		colors: {
			background: {
				// in the form "rgba(255, 255, 255, 1)"
				type: String,
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
		},
		tileId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

CustomColorSettingSchema.plugin(require("mongoose-autopopulate"));

module.exports =
	mongoose.models?.CustomColorSetting ||
	mongoose.model("CustomColorSetting", CustomColorSettingSchema);
