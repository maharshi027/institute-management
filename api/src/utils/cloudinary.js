import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      folder: "batches",
      resource_type: "auto",
    });

    fs.unlinkSync(filePath); // remove local file
    return response.secure_url;

  } catch (error) {
    fs.unlinkSync(filePath); // delete even if error
    console.log("Cloudinary Upload Error:", error);
    throw error;
  }
};
