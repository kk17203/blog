const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");

// GET home page
router.get("/", (req, res, next) => {
    res.render("admin");
});

// Function to extract links from text
function extractLinks(text) {
    const regex = /<a\b[^>]*>.*?<\/a>/g; // Regular expression to match entire anchor tags
    const matches = text.match(regex);

    if (matches) {
        return matches.map((match) => match);
    }

    return [];
}

// POST for admin form
router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        try {
            const title = req.body.entry_title;
            const category = req.body.entry_category;
            const content = req.body.entry_content.replace(/\r?\n/g, "<br>");
            const links = extractLinks(content);

            const newPost = new Post({
                title: title,
                category: category,
                content: content,
                links: links,
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
