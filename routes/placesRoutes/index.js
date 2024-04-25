import express from "express";
import Places from "../../db/models/placesSchema.js";
const router = express.Router();

router.get("/fetch", async (req, res) => {
  const place = await Places.find();
  return res.status(200).json(place);
});

router.post("/add", async (req, res) => {
  const body = { ...req.body };
  await Places.create(body);
  return res.status(201).json({ message: "Added Successfully" });
});

router.patch("/:id", async (req, res) => {
  const body = { ...req.body };
  const filter = { _id: req.params.id };
  await Places.updateOne(filter, body);
  return res.status(201).json({ message: "Updated Successfully" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Places.findByIdAndDelete(id);
  return res.status(201).json({ message: "Deleted Successfully" });
});

export default router;
