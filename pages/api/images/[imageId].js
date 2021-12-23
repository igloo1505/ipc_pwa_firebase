import colors from "colors";
import Cookies from "cookies";
import fs from "fs";
import nc from "next-connect";
import { connectDB } from "../../../utils/connectDB";
import { getImageStream } from "../../../utils/s3";
import CarouselEvent from "../../../models/CarouselEvent";
import multer from "multer";

const handler = nc();

// const getImageUrl = (__id) => {
//     return `api/images/${__id}`;
// }

handler.get(async (req, res) => {
	try {
		let _imageId = req?.query?.imageId;
		let _imageStream = await getImageStream(_imageId);
		_imageStream.pipe(res);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Something went wrong while retrieving that image." });
	}
});

export default handler;

export const config = {
	api: {
		// bodyParser: {
		//   sizeLimit: "5mb",
		// },
		bodyParser: false,
	},
};

// "imgUrl": "/api/images/f66af8a14c844106a25f3bea69453fac",
// "imgKey": "f66af8a14c844106a25f3bea69453fac"
