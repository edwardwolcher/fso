import express from "express";
import Blog from "../models/Blog.js";
import "express-async-errors";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const blogRouter = express.Router();
import { getUser } from "../utils/middleware.js";

// Get All
blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("author", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

// Get by Id
blogRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id).populate("author", {
    username: 1,
    name: 1,
  });
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

// Post
blogRouter.post("/", getUser, async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user.canAuthor()) {
    return res
      .status(401)
      .send({ error: "user does not have posting privileges" });
  }

  delete body.authorID;
  const blogObject = { ...body, author: user._id };
  const blog = new Blog(blogObject);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const populatedBlog = await Blog.findById(savedBlog._id).populate("author", {
    username: 1,
    name: 1,
  });
  res.status(201).json(populatedBlog);
});

// Delete by ID
blogRouter.delete("/:id", getUser, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) return res.status(404).send({ error: "already deleted" });
  if (!(blog.author.toString() === user._id.toString() || user.canEdit())) {
    return res.status(401).send({ error: "insufficent prvileges" });
  }
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (deletedBlog) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

// Update
blogRouter.put("/:id", getUser, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  updates.author = updates.author.id; // TODO - explore a better way than this?
  const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
    new: true,
  }).populate("author", {
    username: 1,
    name: 1,
  });
  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404).end();
  }
});

export default blogRouter;
