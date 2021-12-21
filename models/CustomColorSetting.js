const mongoose = require("mongoose");

const CustomTileColorSchema = mongoose.Schema(
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

CustomTileColorSchema.plugin(require("mongoose-autopopulate"));

module.exports =
	mongoose.models?.CustomTileColor ||
	mongoose.model("CustomTileColor", CustomTileColorSchema);
