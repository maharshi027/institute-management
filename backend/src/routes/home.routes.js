import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Batch } from "../models/batch.model.js";
import { Student } from "../models/student.model.js";
import { Fee } from "../models/fee.model.js";

const router = Router();

router.get("/home", verifyJWT, async (req, res) => {
  const userId = req.user.userId;

  try {
    const latestTransaction = await Fee.find({ userId })
      .sort({ $natural: -1 })
      .limit(5);
    const latestStudent = await Student.find({ userId })
      .sort({ $natural: -1 })
      .limit(5);
    const totalBatch = await Batch.countDocuments({ userId });
    const totalStudent = await Student.countDocuments({ userId });

    const totalFeeCollection = await Fee.aggregate([
      { $match: { userId: userId.toString() } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalFee = totalFeeCollection[0]?.total || 0;
    // console.log(latestStudent, newBatch);

    res.status(200).json({
      latestTransaction: latestTransaction,
      latestStudent: latestStudent,
      totalBatch: totalBatch,
      totalStudent: totalStudent,
      totalFee: totalFee,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
