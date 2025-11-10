import express from "express";
import fs from "fs";
import { upload } from "../utils/multer";
import cloudinary from "../config/cloudinary";

const router = express.Router();

// Upload to Cloudinary (CDN)
/**
 * @openapi
 * /api/upload/cloud:
 *   post:
 *     summary: Upload a file to Cloudinary
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 url:
 *                   type: string
 *                 public_id:
 *                   type: string
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Upload failed
 */
router.post("/cloud", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return; // explicit void
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "mern_uploads",
      resource_type: "auto",
    });

    fs.unlinkSync(req.file.path);
    res.json({
      message: "Uploaded successfully",
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err: any) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Upload failed" });
  }
});


export default router;
