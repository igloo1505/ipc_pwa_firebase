import mongoose from "mongoose";

const CarouselEvent = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		imgUrl: {
			type: String,
			required: true,
		},
		linkHref: {
			type: String,
			required: true,
		},
		content: {
			title: {
				type: String,
				required: false,
			},
			subTitle: {
				type: String,
				required: false,
			},
			description: {
				type: String,
				required: false,
			},
			showSignature: {
				type: Boolean,
				default: false,
			},
		},
		accessRights: {
			isStaff: {
				type: Boolean,
				default: false,
			},
			isAdmin: {
				type: Boolean,
				default: false,
			},
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports =
	mongoose.models?.CarouselEvent ||
	mongoose.model("CarouselEvent", CarouselEvent);
