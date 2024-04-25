import express from "express";
import Feedback from "../../db/models/feedbackSchema.js";
import checkToken from "../../middleware/checkTocken.js";
const router = express.Router();

router.get("/fetch", async (req, res) => {
  const feedback = await Feedback.find();
  return res.status(200).json(feedback);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const feedback = await Feedback.find({"package":id}).populate([
    "user",
  ]);
  return res.status(200).json(feedback);
});

router.post("/add", async (req, res) => {
  const body = { ...req.body };
  await Feedback.create(body);
  return res.status(201).json({ message: "Added Successfully" });
});

router.patch("/:id", async (req, res) => {
  const body = { ...req.body };
  const filter = { _id: req.params.id };
  await Feedback.updateOne(filter, body);
  return res.status(201).json({ message: "Updated Successfully" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Feedback.findByIdAndDelete(id);
  return res.status(201).json({ message: "Deleted" });
});

export default router;
