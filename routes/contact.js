const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
require("dotenv").config();

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
router.get("/", (req, res, next) => {
    res.render("contact");
});

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
            // req.flash("successMessage", "Email has been sent!");
            return res.redirect("/contact");
        } catch (error) {
            console.error(error);
            // req.flash("errorMessage", "Error Sending Email");
            res.redirect("/");
        }
    })
);

module.exports = router;
