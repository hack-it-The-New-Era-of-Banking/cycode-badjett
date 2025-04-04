const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

// routes import
// user
const authRoute = require("./routes/User/authRoute");
const userRoute = require("./routes/User/userRoute");

// main functionalities

// utility
const aliveRoute = require("./routes/aliveRoute");
const AppError = require("./utilities/appError");
const checkAuth = require("./utilities/checkAuth");
const globalErrorHandler = require("./controller/ErrorController");

// initializations
const app = express();
app.set("trust proxy", 1);

const limiter = rateLimit({
  max: 1000,
  windowMs: 10 * 60, // 1 minute
  message: "Too many requests, please try again later.",
});

// middlewares
app.use(helmet()); // ensures secure web application by setting various HTTP headers
app.use(
  express.json({
    limit: "10kb",
  })
); // Body Parser
// app.use(mongoSanitize()); //Data sanization against NoSQL query injection
app.use(hpp()); // prevent paramater pollution
app.use(cors()); // Cross Origin Resource Sharing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "geolocation=(self), camera=()");
  next();
});
app.use("/api", limiter); //Protection Against DDOS Attack

// routes
// user
// app.use("/api/auth", authRoute);
// app.use("/api/user", checkAuth, userRoute);

// // main functionalities

// // utility
// app.use("/api/alive", aliveRoute);

console.log("Mounting /api/auth");
app.use("/api/auth", authRoute);

console.log("Mounting /api/user");
app.use("/api/user", checkAuth, userRoute);

console.log("Mounting /api/alive");
app.use("/api/alive", aliveRoute);

// route catch
// app.all("*", (req, res, next) => {
//   console.log(req.originalUrl)
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });
app.use(globalErrorHandler);




module.exports = app;

