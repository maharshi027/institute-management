import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto"
    })

    fs.unlinkSync(filePath);
    return {
      url: response.secure_url,
      imageId: response.public_id,
    };

  } catch (error) {
    
     if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.log("Cloudinary Upload Error:", error);
    throw error;
  }
};

const deleteFromCloudinary = async (imageId) => {
  try {
    if (!imageId) return null;

    const result = await cloudinary.uploader.destroy(imageId);
    return result; // returns { result: 'ok' }
    
  } catch (error) {
    console.log("Cloudinary Delete Error:", error);
    throw error;
  }
};

export {uploadToCloudinary, deleteFromCloudinary}