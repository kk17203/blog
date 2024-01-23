const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/posts");

// GET home page
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.render("index", { posts: posts });
    })
);

module.exports = router;
