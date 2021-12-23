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
				max: 40,
			},
			subTitle: {
				type: String,
				required: false,
				max: 40,
			},
			description: {
				type: String,
				required: false,
				max: 200,
			},
			showSignature: {
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
