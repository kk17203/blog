const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/posts");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function getPostTextContent(html) {
    const dom = new JSDOM(html);
    return dom.window.document.body.textContent || "";
}

// GET home page
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({ featured: { $exists: false } }).sort({
            createdAt: -1,
        });

        const featuredPosts = await Post.find({
            featured: { $exists: true },
        }).sort({
            createdAt: -1,
        });

        res.render("index", {
            posts: posts,
            featuredPosts: featuredPosts,
            getPostTextContent: getPostTextContent,
        });
    })
);

module.exports = router;
