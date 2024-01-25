const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const bodyParser = require("body-parser");
const multer = require("multer");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("./routes/passport-config")(passport); //Link to passport config file

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const blogRouter = require("./routes/blog");
const recommendationsRouter = require("./routes/recommendations");
const aboutRouter = require("./routes/about");
const contactRouter = require("./routes/contact");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");

const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
    console.log("CONNECTING TO DATABASE");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATABASE CONNECTION SUCCESS");
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    // Gives views access to currentUser
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/blog", blogRouter);
app.use("/recommendations", recommendationsRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

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
