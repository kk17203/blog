const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/posts");

// GET Declutter Blog page
router.get(
    "/declutter",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "declutter",
        });

        res.render("declutter", { posts: posts });
    })
);

// GET Budget Blog page
router.get(
    "/budget",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "budget",
        });

        res.render("budget", { posts: posts });
    })
);

// GET Cooking Blog page
router.get(
    "/cooking",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "cooking",
        });

        res.render("cooking", { posts: posts });
    })
);

// GET Fitness Blog page
router.get(
    "/fitness",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            category: "fitness",
        });

        res.render("fitness", { posts: posts });
    })
);

module.exports = router;
