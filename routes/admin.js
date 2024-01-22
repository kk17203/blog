const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");

// GET home page
router.get("/", (req, res, next) => {
    res.render("admin");
});

// POST for admin form
router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        try {
            const newPost = new Post({
                title: req.body.entry_title,
                category: req.body.entry_category,
                content: req.body.entry_content,
            });

            await newPost.save();
            console.log("Post Saved");

            return res.redirect("/admin");
        } catch (error) {
            console.error(error);
        }
    })
);

module.exports = router;
