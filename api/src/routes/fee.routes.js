import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: "Fee route working" });
});

export default router;
