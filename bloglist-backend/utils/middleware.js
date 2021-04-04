import { logInfo, logError } from "./logger.js";

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

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

export { requestLogger, unknownEndpoint, errorHandler };
