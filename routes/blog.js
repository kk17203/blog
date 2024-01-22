const express = require("express");
const router = express.Router();

// GET Declutter Blog page
router.get("/declutter", (req, res, next) => {
    res.render("declutter");
});

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
