import express from "express";
import BookPackage from "../../db/models/bookPackageSchema.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/add", async (req, res) => {
  const body = { ...req.body };
  await BookPackage.create(body);
  const userid = body.email;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "learnm2024@gmail.com",
      pass: "eojh llvz xofe okuj",
    },
  });
  let mailOptions = {
    from: "learnm2024@gmail.com",
    to: userid,
    subject: "Booking Confirmation Mail",
    text: "Your booking is confirmed! Booking Id 3545@##88",
  };
  transporter.sendMail(mailOptions);
  res.status(201).json({ message: "Booked" });
});

router.get("/fetch", async (req, res) => {
  const booking = await BookPackage.find();
  res.status(200).json(booking);
});

router.get("/fetch/:id", async (req, res) => {
  const { id } = req.params;
  const booking = await BookPackage.find({ user: id }).populate([
    "user",
    "package",
  ]);
  res.status(200).json(booking);
});
router.get("/pdf/:id", async (req, res) => {
  const { id } = req.params;
  const bookings = await BookPackage.findById(id).populate(["user", "package"]);
  res.render("pdf.ejs", { booking: bookings });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await BookPackage.findByIdAndDelete(id);
  return res.status(201).json({ message: "Deleted" });
});

export default router;
