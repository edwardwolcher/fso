import express from "express";
import Blog from "../models/Blog.js";
import "express-async-errors";
const blogRouter = express.Router();

// Get All
blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// Get by Id
blogRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

// Post
blogRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

// Delete by ID
blogRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByIdAndDelete(id);
  if (blog) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

export default blogRouter;
