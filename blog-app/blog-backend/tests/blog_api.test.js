import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app.js";
import Blog from "../models/Blog.js";
import User from "../models/User.js";
import {
  initialBlogs,
  getBlogs,
  nonExistingId,
  initialAuthors,
  getToken,
} from "./test_helper";

const api = supertest(app);

beforeAll(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const userObjects = initialAuthors.map((user) => new User(user));
  const userPromiseArray = userObjects.map((user) => user.save());
  await Promise.all(userPromiseArray);
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const blogPromiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(blogPromiseArray);
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
    expect(result.body.id).toEqual(oneBlog.id);
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
      authorID: "5a422aa71b54a676234d17a1",
      url: "/blog/newBlog",
      likes: 5,
    };
    const token = getToken(initialAuthors[0]);
    await api
      .post("/api/blogs")
      .set({ authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const resultingBlogs = await getBlogs();
    expect(resultingBlogs).toHaveLength(initialBlogs.length + 1);
    const titles = resultingBlogs.map((r) => r.title);
    expect(titles).toContain("newBlog");
  });

  test("user without author+ role cannot post", async () => {
    const newBlog = {
      title: "newBlog",
      authorID: "5a422aa71b54a676234d17a2",
      url: "/blog/newBlog",
      likes: 5,
    };
    const token = getToken(initialAuthors[1]);
    await api
      .post("/api/blogs")
      .set({ authorization: `Bearer ${token}` })
      .send(newBlog)
      .expect(401);
  });

  test("a new blog defaults to zero likes", async () => {
    const newBlog = {
      title: "unlikedBlog",
      authorID: "5a422aa71b54a676234d17a1",
      url: "/blog/unlikedBlog",
    };
    const token = getToken(initialAuthors[0]);
    await api
      .post("/api/blogs")
      .set({ authorization: `Bearer ${token}` })
      .send(newBlog);
    const createdBlog = await Blog.findOne({ title: "unlikedBlog" });
    expect(createdBlog.likes).toBe(0);
  });

  test("new blog without 'title' gives 400", async () => {
    const newBlog = {
      author: "5a422aa71b54a676234d17a1",
      url: "/blog/newBlog",
      likes: 5,
    };
    const token = getToken(initialAuthors[0]);
    await api
      .post("/api/blogs")
      .set({ authorization: `Bearer ${token}` })
      .expect(400);
  });

  test("new blog without 'url' gives 400", async () => {
    const newBlog = {
      title: "no url",
      author: "5a422aa71b54a676234d17a1",
      likes: 5,
    };
    const token = getToken(initialAuthors[0]);
    await api
      .post("/api/blogs")
      .set({ authorization: `Bearer ${token}` })
      .expect(400);
  });
});

describe("Delete by ID", () => {
  test("a post can be deleted", async () => {
    const blogs = await getBlogs();
    const oneBlog = blogs[0];
    const token = getToken(initialAuthors[0]);
    await api
      .delete(`/api/blogs/${oneBlog.id}`)
      .set({ authorization: `Bearer ${token}` })
      .expect(204);
    const newBlogs = await getBlogs();
    expect(newBlogs.length).toBe(blogs.length - 1);
    const nullResult = await Blog.findById(oneBlog.id);
    expect(nullResult).toBeNull();
  });

  test("deleting with malformed token rejected", async () => {
    const blogs = await getBlogs();
    const oneBlog = blogs[0];
    const token = "badtoken";
    await api
      .delete(`/api/blogs/${oneBlog.id}`)
      .set({ authorization: `Bearer ${token}` })
      .expect(401);
  });
  test("deleting without privileges rejected", async () => {
    const blogs = await getBlogs();
    const oneBlog = blogs[0];
    const token = getToken(initialAuthors[1]);
    await api
      .delete(`/api/blogs/${oneBlog.id}`)
      .set({ authorization: `Bearer ${token}` })
      .expect(401);
  });

  test("deleting a bad id gives a 404", async () => {
    const badID = await nonExistingId();
    const token = getToken(initialAuthors[0]);
    await api
      .delete(`/api/blogs/${badID}`)
      .set({ authorization: `Bearer ${token}` })
      .expect(404);
  });

  test("malformed id gives a 400", async () => {
    const token = getToken(initialAuthors[0]);
    await api
      .delete(`/api/blogs/foo`)
      .set({ authorization: `Bearer ${token}` })
      .expect(400);
  });
});

describe("Update", () => {
  test("a post can be updated", async () => {
    const blogs = await getBlogs();
    const blogToUpdate = blogs[0];
    const blogUpdate = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    const token = getToken(initialAuthors[0]);

    await api
      .put(`/api/blogs/${blogUpdate.id}`)
      .set({ authorization: `Bearer ${token}` })
      .send(blogUpdate)
      .expect(200);
    const updatedBlog = await Blog.findById(blogUpdate.id);
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
  });

  test("putting to a bad id gives a 404", async () => {
    const blogs = await getBlogs();
    const blogToUpdate = blogs[0];
    const blogUpdate = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    const token = getToken(initialAuthors[0]);
    const badID = await nonExistingId();
    await api
      .put(`/api/blogs/${badID}`)
      .set({ authorization: `Bearer ${token}` })
      .send(blogUpdate)
      .expect(404);
  });

  test("malformed id gives a 400", async () => {
    const blogs = await getBlogs();
    const blogToUpdate = blogs[0];
    const blogUpdate = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
    const token = getToken(initialAuthors[0]);
    await api
      .put(`/api/blogs/bar`)
      .set({ authorization: `Bearer ${token}` })
      .send(blogUpdate)
      .expect(400);
  });
});

afterAll(async () => {
  await Blog.deleteMany({});
  mongoose.connection.close();
});
