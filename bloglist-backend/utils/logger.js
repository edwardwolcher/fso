const testing = process.env.NODE_ENV === "test";

const logInfo = (...params) => {
  if (testing) return;
  console.log(...params);
};

const logError = (...params) => {
  if (testing) return;
  console.error(...params);
};

export { logInfo, logError };
