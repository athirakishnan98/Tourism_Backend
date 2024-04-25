import express from "express";
import adminRoutes from "./adminRoutes/index.js";
import userRoutes from "./userRoutes/index.js";
import imageRoutes from "./imageRoutes/index.js";
import packageRoutes from "./packageRoutes/index.js";
import bookingRoute from "./bookPackageRoute/index.js";
import feedbackRoute from "./FeedbackRoutes/index.js";
import placesRoute from "./placesRoutes/index.js"

const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/", imageRoutes);
router.use("/package", packageRoutes);
router.use("/booking", bookingRoute);
router.use("/feedback", feedbackRoute);
router.use("/places", placesRoute);


export default router;
