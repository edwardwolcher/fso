import app from "./app.js";
import http from "http";
import { PORT } from "./utils/config.js";
import { logInfo } from "./utils/logger.js";

const server = http.createServer(app);

server.listen(PORT, () => {
  logInfo(`Server running on port ${PORT}`);
});
