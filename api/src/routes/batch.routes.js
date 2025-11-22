import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Batch } from "../models/batch.model.js";
import { upload } from "../middleware/multer.middleware.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { Student } from "../models/student.model.js";

const router = Router();

router.post("/add-batches", verifyJWT, upload.single("thumbnail"), async (req, res) => {
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

router.get("/batch-details", verifyJWT, async (req, res) => {
  const userId = req.user.userId;

  try {
    const getAllBatch = await Batch.find({userId})
    .select("_id userId batchName price description startingDate endDate thumbnailUrl imageId")
    
    return res.status(200).json({
        batches: getAllBatch
      });
  } catch (err) {
    res.status(500).json({
      error: err
    })
  }

});

router.get("/batch-details/:id", verifyJWT, async (req, res) => {
  const userId = req.user.userId;

  try {
    const batch = await Batch.findOne({ userId, _id: req.params.id})
    .select("_id userId batchName price description startingDate endDate thumbnailUrl imageId");

    if (!batch) {
      return res.status(404).json({ msg: "Batch not found" });
    }

    const students = await Student.find({ batchId: req.params.id })

    return res.status(200).json({ batch , studentList: students });

  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
      error: err.message
    });
  }
});

router.delete("/:id", verifyJWT, async (req, res) => {
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

router.put("/:id",verifyJWT, upload.single("thumbnail"), async (req, res) => {
    const userId = req.user.userId;

    try {
      const batch = await Batch.findById(req.params.id);

      if (!batch) {
        return res.status(404).json({ error: "Batch not found" });
      }

      // Ownership check
      if (batch.userId.toString() !== userId) {
        return res
          .status(403)
          .json({ error: "You are not allowed to update this batch" });
      }

      // ---------- Image update -------------
      let thumbnailUrl = batch.thumbnailUrl;
      let imageId = batch.imageId;

      if (req.file) {
        // console.log("New image updating...");

        if (batch.imageId) {
          await deleteFromCloudinary(batch.imageId);
        }

        // Upload new image
        const uploaded = await uploadToCloudinary(req.file.path);
        thumbnailUrl = uploaded.url;
        imageId = uploaded.imageId;
      }

      // ---------- Update the details of the batchj -------------

      const updatedData = {
        batchName : req.body.batchName || batch.batchName,
        price : req.body.price || batch.price,
        description : req.body.description || batch.description,
        startingDate : req.body.startingDate,
        endDate : req.body.endDate,
        thumbnailUrl : thumbnailUrl,
        imageId : imageId
      }

      const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, updatedData,
       {
         new : true
       }
      )

      return res.status(200).json({
        msg: "Batch updated successfully",
        batch: updatedBatch,
      });
    } catch (err) {
      return res.status(500).json({
        msg: "Server error",
        error: err.message,
      });
    }
  }
);

export default router;
