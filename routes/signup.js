const express = require("express");
const router = express.Router();
const User = require("../models/users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
    res.redirect("/");
});

// GET login page
// router.get("/", (req, res, next) => {
//     res.render("signup", {
//         message: "",
//     });
// });

// // POST for sign-up form
// router.post(
//     "/",
//     asyncHandler(async (req, res, next) => {
//         const action = req.body.action;

//         const { username, password, email, first_name, last_name } = req.body;

//         // Make username all lowercase and take out any spaces. Including leading and trailing
//         const processedUsername = username.toLowerCase().trim();
//         const processedEmail = email.trim();
//         const processedFirstName = first_name.trim();
//         const processedLastName = last_name.trim();

//         const existingUser = await User.findOne({
//             username: processedUsername,
//         });
//         if (existingUser) {
//             return res.render("signup", {
//                 message: "Username already exists. Please choose another",
//             });
//         }
//         // Hash and Salt password before save
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         //Create a new user with User model
//         const newUser = new User({
//             username: processedUsername,
//             password: hashedPassword, // Save the hash password
//             email: processedEmail,
//             first_name: processedFirstName,
//             last_name: processedLastName,
//             loginHistory: {
//                 timestamp: new Date(),
//                 ipAddress: req.ip,
//             },
//         });

//         // Save newUser to DB
//         await newUser.save();

//         // Log the user in automatically by creating a session
//         req.login(newUser, (err) => {
//             if (err) {
//                 return next(err);
//             }
//             res.redirect("/admin");
//         });
//     })
// );

module.exports = router;
