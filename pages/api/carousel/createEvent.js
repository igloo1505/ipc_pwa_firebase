import colors from "colors";
import Cookies from "cookies";
import fs from "fs";
import nc from "next-connect";
import { connectDB } from "../../../utils/connectDB";
import { uploadImage, uniqueFileName } from "../../../utils/s3";
import UIMessage from "../../../models/local/UIMessage";
import CarouselEvent from "../../../models/CarouselEvent";
import User from "../../../models/User";
import multer from "multer";
import { handleAuth } from "../../../utils/handleCookies";

const _destination = "./carouselImageUploading";

const upload = multer({
	storage: multer.diskStorage({
		destination: _destination,
		filename: (req, file, cb) => cb(null, file.originalname),
	}),
});

// TODO add auth middleware back in to all protected routes
// TODO add check for cookies and adapt to 'remember me' state stored in cookies, and sign jwt in cookies as well.
const handler = nc();
const uploadMiddleware = upload.single("carouselImage");

handler.use(uploadMiddleware);

handler.post(async (req, res) => {
	try {
		const cookies = new Cookies(req, res);
		const {
			name,
			linkHref,
			title,
			subTitle,
			description,
			showSignature,
			author,
		} = req.body;

		let user = await User.findById(author);
		if (!user) {
			let uiMessage = new UIMessage(
				"Unauthorized. Please try loggin in again.",
				"error"
			);
			return res.json({
				success: false,
				message: "Unauthorized.",
				UIMessage: uiMessage,
			});
		}

		let auth = handleAuth(cookies, user);
		if (!auth.success) {
			let uiMessage = new UIMessage(
				"Unauthorized. Why try to hack a church?",
				"error"
			);
			return res.json({
				success: false,
				message: "Unauthorized.",
				UIMessage: uiMessage,
			});
		}

		// has access right and user

		let newCarouselEvent = new CarouselEvent({
			name,
			linkHref,
			// imgUrl,
			content: {
				title,
				subTitle,
				description,
				showSignature,
			},
			author,
		});

		// if (recipe && recipe.createdBy === req.body.userId) {

		const _fileName = uniqueFileName();
		const uploaded = await uploadImage(req.file, _fileName);

		newCarouselEvent.imgUrl = `/api/images/${uploaded.Key}`;
		// newCarouselEvent.imgKey = uploaded.Key;
		await newCarouselEvent.save();

		// Remove file stored in server
		fs.unlink(`${_destination}/${req.file.filename}`, (err) => {});

		return res.json({
			imgUrl: `/api/images/${uploaded.Key}`,
			imgKey: uploaded.Key,
			newCarouselEvent,
		});
	} catch (error) {
		res
			.status(500)
			.json({ error: "Something went wrong while uploading that image." });
	}
});

export default connectDB(handler);

export const config = {
	api: {
		// bodyParser: {
		//   sizeLimit: "5mb",
		// },
		bodyParser: false,
	},
};
