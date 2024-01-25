const express = require("express");
const router = express.Router();
const passport = require("passport");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");

/* GET login page. */
router.get("/", (req, res, next) => {
    // See if user is still logged in
    if (req.user) {
        return res.redirect("/admin");
    }

    res.render("login");
});

// POST for login form
router.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/",
        failureFlash: true,
    })
);

module.exports = router;
