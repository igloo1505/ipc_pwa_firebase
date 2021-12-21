const mongoose = require("mongoose");

const AccessRightsSchema = mongoose.Schema(
	{
		isAdmin: {
			type: Boolean,
			default: false,
		},
		allowGrantAccessToOthers: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

AccessRightsSchema.plugin(require("mongoose-autopopulate"));

module.exports =
	mongoose.models?.AccessRights ||
	mongoose.model("AccessRights", AccessRightsSchema);
