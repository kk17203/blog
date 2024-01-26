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
            title: "Declutter",
            message:
                "As a mom, I understand the constant challenge of keeping our spaces organized and clutter-free. Join me as I explore practical decluttering tips and share our journey towards a more simplified life.",
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
            title: "Budget",
            message:
                "Managing a household budget can be a daunting task, but it doesn't have to be. Join me as I share budgeting strategies, frugal living tips, and ways to make the most of your resources.",
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
            title: "Cooking",
            message:
                "Embarking on a culinary adventure, I'm excited to share my kitchen escapades. Join me as I explore the world of cooking from the perspective of a mom who's discovering the joy of creating simple, family-friendly meals. It's all about embracing the learning curve and having fun in the kitchen together!",
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
            title: "Faith",
            message:
                "Navigating life with faith is a journey I cherish, and I'm excited to share it with you here on 'Simply Kaitie.' As a Christian, I find solace and purpose in the belief that Jesus is God's son, offering salvation through His boundless love. Join me in weaving faith into our daily routines, exploring prayerful moments, and reflecting on the profound teachings of scripture.",
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
            title: "Fitness",
            message:
                "Balancing a busy family life doesn't mean neglecting personal well-being. Dive into fitness tips, routines, and ideas that cater to moms on the go. Let's stay active together!",
            posts: posts,
            getPostTextContent: getPostTextContent,
        });
    })
);

module.exports = router;
