import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Batch } from "../models/batch.model.js";
import { upload } from "../middleware/multer.middleware.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";

const router = Router();
router.post(
  "/add-batches",
  verifyJWT,
  upload.single("thumbnail"),
  async (req, res) => {
    const { batchName, price, description, startingDate, endDate } = req.body;
    const thumbnailPath = req.file?.path;

    if (!thumbnailPath) {
      return res.status(400).json({ msg: "Thumbnail is required" });
    }

    try {
      const uploaded = await uploadToCloudinary(thumbnailPath);

      const newBatch = new Batch({
        batchName,
        price,
        description,
        startingDate,
        endDate,
        thumbnailUrl: uploaded.url,
        imageId: uploaded.imageId,
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

router.get("/batch-details/:id", verifyJWT, async (req, res) => {
  const userId = req.user.userId;

  try {
    const batch = await Batch.findOne({
      userId,
      _id: req.params.id
    }).select("_id userId batchName price description startingDate endDate thumbnailUrl imageId");

    if (!batch) {
      return res.status(404).json({ msg: "Batch not found" });
    }

    return res.status(200).json({
      batch
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
      error: err.message
    });
  }
});

router.delete("/delete-batch/:id", verifyJWT, async (req, res) => {
  const userId = req.user.userId;
  const batchId = req.params.id;

  try {
    const batch = await Batch.findOne({ _id: batchId, userId });

    if (!batch) {
      return res.status(404).json({ msg: "Batch not found" });
    }

    // delete image from cloudinary
    if (batch.imageId) {
      await deleteFromCloudinary(batch.imageId);
    }

    await Batch.findByIdAndDelete(batchId);

    return res.status(200).json({
      msg: "Batch deleted successfully",
    });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
      error: err.message,
    });
  }
});

export default router;
