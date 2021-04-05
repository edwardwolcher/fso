import mongoose from "mongoose";
import bcrypt from "bcrypt";
import supertest from "supertest";
import app from "../app.js";
import User from "../models/User.js";
import { getUsers } from "./test_helper";

const api = supertest(app);

describe("creating users", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("can create new user", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: "newuser",
      name: "New User",
      password: "12345",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("rejects too short password", async () => {
    const usersAtStart = await getUsers();
    const newUser = {
      username: "tooshortpw",
      password: "123",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await getUsers();
    expect(usersAtStart).toEqual(usersAtEnd);
  });

  test("rejects missing username", async () => {
    const usersAtStart = await getUsers();
    const newUser = {
      password: "12345",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await getUsers();
    expect(usersAtStart).toEqual(usersAtEnd);
  });

  test("rejects missing password", async () => {
    const usersAtStart = await getUsers();
    const newUser = {
      username: "nopassword",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await getUsers();
    expect(usersAtStart).toEqual(usersAtEnd);
  });

  test("rejects too short username", async () => {
    const usersAtStart = await getUsers();
    const newUser = {
      username: "s",
      password: "12345",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await getUsers();
    expect(usersAtStart).toEqual(usersAtEnd);
  });

  test("rejects duplicate username", async () => {
    const usersAtStart = await getUsers();
    const newUser = {
      username: "root",
      password: "12345",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersAtEnd = await getUsers();
    expect(usersAtStart).toEqual(usersAtEnd);
  });
});

describe("getting users", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    const user1 = new User({ username: "edward", passwordHash });
    const user2 = new User({ username: "clive", passwordHash });
    await user1.save();
    await user2.save();
  });

  test("users are returned as json", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("get all users", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(2);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  mongoose.connection.close();
});
