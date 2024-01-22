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
router.get("/budget", (req, res, next) => {
    res.render("budget");
});

// GET Cooking Blog page
router.get("/cooking", (req, res, next) => {
    res.render("cooking");
});

// GET Fitness Blog page
router.get("/fitness", (req, res, next) => {
    res.render("fitness");
});

// GET Budget Blog page
router.get("/budget", (req, res, next) => {
    res.render("budget");
});

module.exports = router;
