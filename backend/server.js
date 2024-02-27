const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// config
dotenv.config({ path: "backend/config/config.env" });

// Connect to the database
connectDatabase();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught Exception");
  process.exit(1);
});

// Handled Promise
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
