import express from "express";
import { getBanner, saveBanner } from "../controllers/banner.controller.js";
import upload  from "../middleware/upload.middleware.js";

const router = express.Router();

// 👇 upload 2 images
router.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  saveBanner
);

router.get("/", getBanner);

export default router;