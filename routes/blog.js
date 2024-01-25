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

// GET Declutter Blog page
router.get(
    "/declutter",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Declutter",
        }).sort({ createdAt: -1 });

        res.render("declutter", {
            posts: posts,
            getPostTextContent: getPostTextContent,
        });
    })
);

// GET Budget Blog page
router.get(
    "/budget",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Budget",
        }).sort({ createdAt: -1 });

        res.render("budget", {
            posts: posts,
            getPostTextContent: getPostTextContent,
        });
    })
);

// GET Cooking Blog page
router.get(
    "/cooking",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Cooking",
        }).sort({ createdAt: -1 });

        res.render("cooking", {
            posts: posts,
            getPostTextContent: getPostTextContent,
        });
    })
);

// GET Faith Blog page
router.get(
    "/faith",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Faith",
        }).sort({ createdAt: -1 });

        res.render("faith", {
            posts: posts,
            getPostTextContent: getPostTextContent,
        });
    })
);

// GET Fitness Blog page
router.get(
    "/fitness",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Fitness",
        }).sort({ createdAt: -1 });

        res.render("fitness", {
            posts: posts,
            getPostTextContent: getPostTextContent,
        });
    })
);

module.exports = router;
