import express from "express";
import multer from "multer";

const router = express.Router();
// router.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/image", upload.single("file"), (req, res) => {
  res.json({ url: `http://localhost:3000/${req.file.filename}` });
});

export default router;
