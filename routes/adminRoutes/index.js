import express from "express";
import bcrypt from "bcrypt";
import Admin from "../../db/models/adminSchema.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  const isAdmin = await Admin.findOne({ username: body.username });
  if (isAdmin) {
    return res.status(409).json({ message: "username already taken" });
  }

  if (body.password != body.confirmPassword) {
    return res.status(409).json({ message: "password doesn't match" });
  }

  const hashPassword = await bcrypt.hash(body.password, 2);
  body.password = hashPassword;
  await Admin.create(body);
  res.status(201).json({ message: "Signup Successfull" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const admin = await Admin.findOne({ username: body.username });
  if (!admin) {
    return res.status(401).json({ message: "username or password incorrect" });
  }

  const isMatching = await bcrypt.compare(body.password, admin.password);
  if (!isMatching) {
    return res.status(401).json({ message: "username or password incorrect" });
  }
  // const sec_key = process.env.DOCTOR_SECRET_KEY
  const token = jwt.sign(
    { id: admin._id, role: "ADMIN" },
    "gsdsjdy76d87ad7@jdsdhsjhd@#",
    { expiresIn: "7d" }
  );
  res.status(200).json({ message: "Login Successfull", token: token });
});

router.get("/admin/:id", async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findById(id);
  delete admin.password;
  res.status(200).json(admin);
});

export default router;
