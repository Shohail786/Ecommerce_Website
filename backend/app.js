const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
// config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// // Serve frontend build
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// // Handle unmatched routes with frontend's index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
// });

// Middleware for error
app.use(errorMiddleware);

module.exports = app;
