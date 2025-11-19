import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Batch } from "../models/batch.model.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const router = Router();

router.post(
  "/add-batches",
  verifyJWT,
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      const { batchName, price, description, startingDate, endDate } = req.body;

      if (!req.file) {
        return res.status(400).json({ msg: "Thumbnail is required" });
      }

    //-------------------------------- upload to cloudinary Image(Thumbnail) ------------------------------

      const thumbnailUrl = await uploadToCloudinary(req.file.path);

      const newBatch = new Batch({
        batchName,
        price,
        description,
        startingDate,
        endDate,
        thumbnailUrl,
        userId: req.user.userId,
      });

      const savedBatch = await newBatch.save();

      return res.status(201).json({
        msg: "Batch created successfully",
        batch: savedBatch,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Server error",
        error: error.message,
      });
    }
  }
);

export default router;
