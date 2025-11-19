import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const storage = new multer.diskStorage({
  destination: function(rewq, file, cb){
    cb(null, "./public/temp")
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  },
  params: {
    folder: "batches",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }
});

export const upload = multer({ storage, });
