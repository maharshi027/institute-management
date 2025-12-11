import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Batch } from "../models/batch.model.js";
import { Student } from "../models/student.model.js";

const router = Router();

router.get("/home", verifyJWT, async (req, res) => {
  const userId = req.user.userId;
 
  try {
    const newBatch = await Batch.find({ userId }).sort({ $natural: -1 }).limit(5);
    const student = await Student.find({ userId }).sort({ $natural: -1 }).limit(5);
    console.log(newBatch);
    
    res.status(200).json({ batch: newBatch });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
