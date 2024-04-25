import express from "express";
import Tour from "../../db/models/packageSchema.js";
import checkToken from "../../middleware/checkTocken.js";
const router = express.Router();

router.get("/fetch", async (req, res) => {
  const tour = await Tour.find();
  return res.status(200).json(tour);
});

router.post("/add", async (req, res) => {
  const body = { ...req.body };
  await Tour.create(body);
  return res.status(201).json({ message: "Added Successfully" });
});

router.get("/:id" ,async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);
  res.status(200).json(tour);
});

router.patch("/:id", async (req, res) => {
  const body = { ...req.body };
  const filter = { _id: req.params.id };
  await Tour.updateOne(filter, body);
  return res.status(201).json({ message: "Updated Successfully" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Tour.findByIdAndDelete(id);
  return res.status(201).json({ message: "Deleted Successfully" });
});

export default router;
