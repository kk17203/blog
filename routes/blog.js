const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/posts");

// GET Declutter Blog page
router.get(
    "/declutter",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Declutter",
        }).sort({ createdAt: -1 });

        res.render("declutter", { posts: posts });
    })
);

// GET Budget Blog page
router.get(
    "/budget",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Budget",
        }).sort({ createdAt: -1 });

        res.render("budget", { posts: posts });
    })
);

// GET Cooking Blog page
router.get(
    "/cooking",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Cooking",
        }).sort({ createdAt: -1 });

        res.render("cooking", { posts: posts });
    })
);

// GET Fitness Blog page
router.get(
    "/fitness",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "Fitness",
        }).sort({ createdAt: -1 });

        res.render("fitness", { posts: posts });
    })
);

module.exports = router;
