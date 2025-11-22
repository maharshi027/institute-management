import express from "express";
import mongoose from "mongoose";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Student } from "../models/student.model.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.post("/add-student", verifyJWT, upload.single("avatar"), async (req, res) => {
    const { studentName, phone, email, address  } = req.body;
    const avatar = req.file?.path;

    if (!avatar) {
      return res.status(400).json({ msg: "avatar is required" });
    }

    try {
      const uploaded = await uploadToCloudinary(avatar);

      const newStudent = new Student({
        studentName,
        phone,
        email,
        address,
        avatarUrl: uploaded.url,
        avatarId: uploaded.imageId,
        userId: req.user.userId,
        batchId : req.user.batchId
      });

      const studentSaved = await newStudent.save();

      return res.status(201).json({
        msg: "new student added successfully",
        student : studentSaved,
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
