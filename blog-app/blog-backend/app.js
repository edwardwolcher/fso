import express from "express";
import connectDB from "./utils/connectDB.js";
import cors from "cors";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
} from "./utils/middleware.js";
import blogRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";

const app = express();

// Connect to MongoDB
connectDB();

// Serve static Frontend
app.use(express.static("build"));
// Pre-route middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(getTokenFrom);
// Main routes
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
// Post-route middleware
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
