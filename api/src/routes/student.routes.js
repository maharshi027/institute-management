import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: "Student route working" });
});

export default router;
