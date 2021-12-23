import S3 from "aws-sdk/clients/s3";
import { v4 } from "uuid";
import fs from "fs";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_MAIN;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_MAIN;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// TODO add function here to lower resolution before upload.

// POST RECIPE
export const uploadImage = (file, fileName) => {
	console.log("file: ".bgRed.black, file, fileName);

	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		// index to retrieve file: 'Key'
		Key: fileName,
	};
	return s3.upload(uploadParams).promise();
};

// GET Image
export const getImageStream = async (fileKey, req, res) => {
	const downloadParams = {
		Key: fileKey,
		Bucket: bucketName,
	};

	return (
		s3
			.getObject(downloadParams)
			// .on("response", (response) => {})
			.createReadStream()
	);
};

export const uniqueFileName = () => {
	return [...v4()].filter((char) => char !== "-").join("");
};
