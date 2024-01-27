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
                "Join me in the quest for organized and clutter-free spaces. Explore practical decluttering tips on our journey to a simplified and harmonious life.",
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
                "Explore budgeting strategies, frugal living tips, and how to optimize effective household budget management. Join me on this financial journey!",
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
                "Embark on a culinary adventure with a mom's joy in creating simple, family-friendly meals. Join me in the kitchen for learning and fun!",
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
                "Embark on a faith journey with 'Simply Kaitie.' Find solace, purpose, and boundless love in Jesus. Weave faith into daily life and reflect on scripture.",
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
