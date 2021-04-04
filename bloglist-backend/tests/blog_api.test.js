import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/Blog.js";
import { initialBlogs, getBlogs, nonExistingId } from "./test_helper";

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Get All", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe("Get by ID", () => {
  test("a specific blog can be retrieved", async () => {
    const blogs = await getBlogs();
    const oneBlog = blogs[0];
    const result = await api.get(`/api/blogs/${oneBlog.id}`);
    expect(result.body).toEqual(oneBlog);
  });

  test("retrieving a bad id gives a 404", async () => {
    const badID = await nonExistingId();
    await api.get(`/api/blogs/${badID}`).expect(404);
  });

  test("malformed id gives a 400", async () => {
    await api.get(`/api/blogs/foo`).expect(400);
  });
});

describe("Post", () => {
  test("a new blog can be posted", async () => {
    const newBlog = {
      title: "newBlog",
      author: "edward",
      url: "/blog/newBlog",
      likes: 5,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const resultingBlogs = await getBlogs();
    expect(resultingBlogs).toHaveLength(initialBlogs.length + 1);
    const titles = resultingBlogs.map((r) => r.title);
    expect(titles).toContain("newBlog");
  });

  test("a new blog defaults to zero likes", async () => {
    const newBlog = {
      title: "unlikedBlog",
      author: "edward",
      url: "/blog/unlikedBlog",
    };
    await api.post("/api/blogs").send(newBlog);
    const searchResult = await Blog.find({ title: "unlikedBlog" });
    const createdBlog = searchResult[0].toJSON();
    expect(createdBlog.likes).toBe(0);
  });

  test("new blog without 'title' gives 400", async () => {
    const newBlog = {
      author: "edward",
      url: "/blog/newBlog",
      likes: 5,
    };
    await api.post("/api/blogs").expect(400);
  });
  test("new blog without 'url' gives 400", async () => {
    const newBlog = {
      title: "no url",
      author: "edward",
      likes: 5,
    };
    await api.post("/api/blogs").expect(400);
  });
});

describe("Delete by ID", () => {
  // test("a post can be deleted", () => {
  //   const blogs = await getBlogs();
  //   const oneBlog = blogs[0];
  //   await api.delete(`api/blogs/${oneBlog.id}`).expect(204)

  // })
  test("retrieving a bad id gives a 404", async () => {
    const badID = await nonExistingId();
    await api.delete(`/api/blogs/${badID}`).expect(404);
  });
  test("malformed id gives a 400", async () => {
    await api.delete(`/api/blogs/foo`).expect(400);
  });
});

afterAll(async () => {
  await Blog.deleteMany({});
  mongoose.connection.close();
});
