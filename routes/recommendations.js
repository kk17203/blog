const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Post = require("../models/posts");

// GET home page
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const posts = await Post.find({
            links: { $exists: true, $not: { $size: 0 } },
        }).sort({
            createdAt: -1,
        });

        console.log(posts);

        res.render("recommendations", { posts: posts });
    })
);

module.exports = router;
