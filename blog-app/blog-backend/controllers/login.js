import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/User.js";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });
  if (!user) return res.status(401).send({ error: "invalid username" });
  const passwordCorrect = await bcrypt.compare(
    body.password,
    user.passwordHash
  );
  if (!passwordCorrect)
    return res.status(401).send({ error: "invalid password" });

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({ token, username: user.username, name: user.name });
});

export default loginRouter;
