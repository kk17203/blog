const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
require("dotenv").config();
const Email = require("../models/emails");
const multer = require("multer");
const multerUpload = multer();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

// GET home page
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const successMessage = req.flash("successMessage");
        const errorMessage = req.flash("errorMessage");

        // Clear the flash messages after declaring to prevent render on next load
        req.flash("successMessage", null);
        req.flash("errorMessage", null);

        res.render("contact", {
            // If the flash message is 0, return null.
            successMessage: successMessage.length > 0 ? successMessage : null,
            errorMessage: errorMessage.length > 0 ? errorMessage : null,
        });
    })
);

/* POST Contact form submission. */
router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !message) {
            console.log(
                "Tried to send blank email. ---------------------------------------------------------------------------"
            );
            // req.flash("errorMessage", "Please provide name and message");
            return res.redirect("/contact");
        }

        const mailOptions = {
            from: {
                name: "SIMPLY KAITIE",
                address: process.env.USER_EMAIL,
            },
            to: process.env.MY_EMAIL,
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `<h3>Form Input</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(
                "Email has been sent!--------------------------------------------------------------------------------"
            );
            req.flash("successMessage", "Email has been sent!");
            return res.redirect("/contact");
        } catch (error) {
            console.error(error);
            req.flash("errorMessage", "Error Sending Email");
            res.redirect("/");
        }
    })
);

// Route for handling the subscription form submission
router.post(
    "/subscribe",
    multerUpload.none(),
    asyncHandler(async (req, res, next) => {
        try {
            console.log("REq body email");
            console.log(req.body.email);

            // Check if the email already exists in the database
            const existingEmail = await Email.findOne({
                email: req.body.email.trim(),
            });

            if (existingEmail) {
                // Email already exists, return an error response
                return res.json({ message: "Email already subscribed." });
            }

            if (!req.body.name) {
                return res.json({
                    message: "no name",
                });
            }

            const validateEmail = (email) => {
                // Regular expression for a basic email format validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                return emailRegex.test(email);
            };

            const trimmedName = req.body.name.trim();
            const trimmedEmail = req.body.email.trim();

            if (!trimmedEmail || !validateEmail(trimmedEmail)) {
                return res.json({
                    message: "no email",
                });
            }

            // Create a new Email instance using the data from the request
            const newEmail = new Email({
                name: trimmedName,
                email: trimmedEmail,
            });

            // Save the new email to the database
            await newEmail.save();

            // Respond with a success message
            res.json({ message: "Thank you for subscribing!" });
        } catch (error) {
            // Handle errors
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    })
);

module.exports = router;
