import { logInfo, logError } from "./logger.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const requestLogger = (req, res, next) => {
  logInfo("Method:", req.method);
  logInfo("Path:  ", req.path);
  logInfo("Body:  ", req.body);
  logInfo("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logError(error.message);

  switch (error.name) {
    case "CastError":
      return res.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return res.status(400).send({ error: error.message });
    case "JsonWebTokenError":
      return res.status(401).send({ error: "invalid token" });
    case "TokenExpiredError":
      return res.status(401).send({ error: "token expired" });
  }

  next(error);
};

const getTokenFrom = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const getUser = async (req, res, next) => {
  const token = req.token;
  if (!token) return res.status(401).send({ error: "token missing" });
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) return res.status(401).send({ error: "token invalid" });
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).send({ error: "invalid user" });
  }
  req.user = user;
  next();
};

export { requestLogger, unknownEndpoint, errorHandler, getTokenFrom, getUser };
