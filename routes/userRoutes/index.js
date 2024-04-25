import express from "express";
import bcrypt from "bcrypt";
import User from "../../db/models/userSchema.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  const isUser = await User.findOne({ username: body.username });
  if (isUser) {
    return res.status(409).json({ message: "username already taken" });
  }

  if (body.password != body.confirmPassword) {
    return res.status(409).json({ message: "password doesnt match" });
  }

  const hashPassword = await bcrypt.hash(body.password, 2);
  body.password = hashPassword;
  await User.create(body);
  res.status(201).json({ message: "Signup Successfull" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ username: body.username });
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "username or password incorrect" });
  }
  console.log(body.password, user.password);
  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    return res.status(401).json({ message: "username or password incorrect" });
  }
  // const sec_key = process.env.USER_SECRET_KEY;
  const token = jwt.sign(
    { id: user._id, role: "USER" },
    "gsdsjdy76d87ad7@jdsdhsjhd@#",
    { expiresIn: "7d" }
  );
  console.log("here");
  res.status(200).json({ message: "Login Successfull", token: token });
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  delete user.password;
  res.status(200).json(user);
});
export default router;
