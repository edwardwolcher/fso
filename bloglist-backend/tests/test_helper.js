import Blog from "../models/Blog";

const initialBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "oneblog",
    author: "edward",
    url: "/blog/oneblog",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f9",
    title: "twoblog",
    author: "edward",
    url: "/blog/twoblog",
    likes: 6,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f0",
    title: "cliveblog",
    author: "clive",
    url: "/blog/cliveblog",
    likes: 7,
    __v: 0,
  },
];

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: "to delete",
    author: "edward",
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

export { initialBlogs, getBlogs, nonExistingId };
