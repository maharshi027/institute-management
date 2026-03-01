import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { Fee } from "../models/fee.model.js";

const router = Router();

router.post("/collect-fee", verifyJWT, async (req, res) => {
  const userId = req.user.userId;

  const { paidBy, phone, batchId, amount, remarks } = req.body;
  const newFee = new Fee({
    paidBy,
    phone,
    batchId,
    amount,
    userId,
    remarks,
  });
  const savedFee = await newFee.save();
  return res.status(201).json({ fee: savedFee });
  
});

// -------------- get fee pay for all courses -------------------

router.get("/paymentHistory", verifyJWT, async (req, res) => {
  const userId = req.user.userId;
  try {
    const feeHistory = await Fee.find({ userId });

    return res.status(200).json({ paymentHistory: feeHistory });
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~ Get all Payment By a Student for a course ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

router.get("/payment", verifyJWT, async (req, res) => {
  //  console.log(req.query);
  const userId = req.user.userId;
  const batchId = req.query.batchId;
  const phone = req.query.phone;
  try {
    const stdPayment = await Fee.find({ userId, batchId, phone });
    res.status(200).json({ studentPayment: stdPayment });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
