const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");

// GET home page
router.get("/", (req, res, next) => {
    res.render("admin");
});

// Function to extract links from text
function extractLinks(text) {
    const regex = /<a\b[^>]*>.*?<\/a>/g; // Regular expression to match entire anchor tags
    const matches = text.match(regex);

    if (matches) {
        return matches.map((match) => match);
    }

    return [];
}

// Google Cloud Storage key as a JSON object
const keyFileContent = {
    type: process.env.FILE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.FILE_PRIVATE_KEY_ID,
    private_key: process.env.FILE_PRIVATE_KEY,
    client_email: process.env.FILE_CLIENT_EMAIL,
    client_id: process.env.FILE_CLIENT_ID,
};

// Initialize google cloud storage
const storage = new Storage({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: keyFileContent,
});

const bucket = storage.bucket(process.env.GOOGLE_BUCKET);

// Set up Multer storage for image uploads
const multerStorage = multer.memoryStorage();

// Set up Multer config with Google Cloud Storage
const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5 MB
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            console.log("Please upload a valid image file");
            return cb(new Error("Please upload a valid image file"));
        }
        cb(undefined, true);
    },
});

// POST for admin form
router.post(
    "/",
    upload.single("image"), // Handle single upload
    asyncHandler(async (req, res, next) => {
        try {
            const file = req.file;

            if (!file) {
                console.log("No file provided");

                const title = req.body.entry_title;
                const category = req.body.entry_category;
                const content = req.body.entry_content.replace(
                    /\r?\n/g,
                    "<br>"
                );
                const links = extractLinks(content);

                const newPost = new Post({
                    title: title,
                    category: category,
                    content: content,
                    links: links,
                });

                await newPost.save();
                console.log("Post Saved");

                return res.redirect("/admin");
            }

            const fileName = `${uuidv4()}-${file.originalname}`;
            const blob = bucket.file(fileName);

            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on("error", (err) => {
                console.error(err);
                res.status(500).json({ error: "Failed to upload file" });
            });

            blobStream.on("finish", async () => {
                const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

                const title = req.body.entry_title;
                const category = req.body.entry_category;
                const content = req.body.entry_content.replace(
                    /\r?\n/g,
                    "<br>"
                );
                const links = extractLinks(content);

                const newPost = new Post({
                    title: title,
                    category: category,
                    content: content,
                    links: links,
                    image: imageUrl,
                });

                await newPost.save();
                console.log("Post Saved");

                return res.redirect("/admin");
            });
            blobStream.end(file.buffer);
        } catch (error) {
            console.error(error);
        }
    })
);

module.exports = router;
