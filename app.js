var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookies = require("cookie-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var session = require("express-session");

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

var indexRouter = require("./routes/mainRouter");
var usersRouter = require("./routes/usersRouter");
var productsRouter = require("./routes/productsRouter");

var app = express();

// view engine setup
app.set("views", [
  path.join(__dirname, "./views"),
  path.join(__dirname, "./views/products"),
  path.join(__dirname, "./views/users"),
]);
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookies());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "s3cr370",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(userLoggedMiddleware);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
