import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

const initialBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "oneblog",
    author: "5a422aa71b54a676234d17a1",
    url: "/blog/oneblog",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "twoblog",
    author: "5a422aa71b54a676234d17a1",
    url: "/blog/twoblog",
    likes: 6,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f0",
    title: "cliveblog",
    author: "5a422aa71b54a676234d17a2",
    url: "/blog/cliveblog",
    likes: 7,
    __v: 0,
  },
];

const initialAuthors = [
  {
    _id: "5a422aa71b54a676234d17a1",
    username: "edward",
    name: "Edward Wolcher",
    role: "author",
    passwordHash:
      "$2b$10$utWgXh9X2BSxT6YFWWijYeKWXshv6XC71EKPRvs1lZyE0FzApLmCu",
    blogs: [],
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17a2",
    username: "clive",
    name: "Clive Cat",
    role: "author",
    passwordHash:
      "$2b$10$utWgXh9X2BSxT6YFWWijYeKWXshv6XC71EKPRvs1lZyE0FzApLmCu",
    blogs: [],
    __v: 0,
  },
];

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: "to delete",
    author: "5a422aa71b54a676234d17a1",
    url: "/blog/deleteme",
    likes: 0,
  });
  await newBlog.save();
  await newBlog.remove();

  return newBlog._id.toString();
};

const getBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getUsers = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export { initialBlogs, initialAuthors, getBlogs, nonExistingId, getUsers };
