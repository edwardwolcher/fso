import express from "express";
import bcrypt from "bcrypt";
import "express-async-errors";
import User from "../models/User.js";
const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  if (body.password.length < 4) {
    return res
      .status(400)
      .send({ error: "password must be at least 4 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    role: body.role,
    passwordHash,
  });

  const savedUser = await user.save();
  res.json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });
  res.json(users);
});

export default usersRouter;
