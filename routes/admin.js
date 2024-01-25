const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const jsdom = require("jsdom");
const posts = require("../models/posts");
const { JSDOM } = jsdom;

// GET home page
router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        // Make sure user is logged in
        if (!req.user || req.user.secret !== process.env.ADMIN_SECRET) {
            return res.redirect("/");
        }

        const posts = await Post.find().exec();
        const postImage = await Post.find({
            image: { $exists: true, $ne: null },
        });
        const postLink = await Post.find({
            links: { $exists: true, $ne: null, $not: { $size: 0 } },
        });

        res.render("adminDashboard", {
            posts: posts,
            postsWithImg: postImage,
            postsWithLinks: postLink,
        });
    })
);

// GET admin new post page
router.get("/newPost", (req, res, next) => {
    // Make sure user is logged in
    if (!req.user || req.user.secret !== process.env.ADMIN_SECRET) {
        return res.redirect("/");
    }

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
    "/newPost",
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

                return res.redirect("/admin/posts");
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

                return res.redirect("/admin/posts");
            });
            blobStream.end(file.buffer);
        } catch (error) {
            console.error(error);
        }
    })
);

function getPostTextContent(html) {
    const dom = new JSDOM(html);
    return dom.window.document.body.textContent || "";
}

// GET admin posts page
router.get(
    "/posts",
    asyncHandler(async (req, res, next) => {
        // Make sure user is logged in
        if (!req.user || req.user.secret !== process.env.ADMIN_SECRET) {
            return res.redirect("/");
        }

        const posts = await Post.find({ featured: { $exists: false } }).sort({
            createdAt: -1,
        });

        const featuredPosts = await Post.find({
            featured: { $exists: true },
        }).sort({
            createdAt: -1,
        });

        res.render("adminPosts", {
            posts: posts,
            featuredPosts: featuredPosts,
            getPostTextContent: getPostTextContent,
        });
    })
);

// GET request to update BookInstance.
router.get(
    "/:id/edit",
    asyncHandler(async (req, res, next) => {
        // Make sure user is logged in
        if (!req.user || req.user.secret !== process.env.ADMIN_SECRET) {
            return res.redirect("/");
        }

        const selectedPost = await Post.findById(req.params.id).exec();

        if (selectedPost === null) {
            // No results
            const err = new Error("Post not found.");
            err.status = 404;
            return next(err);
        }
        console.log(selectedPost);
        res.render("admin", {
            selectedPost: selectedPost,
        });
    })
);

// POST for edit form
router.post(
    "/:id/edit",
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

                const updatedFields = {
                    title: title,
                    category: category,
                    content: content,
                    links: links,
                };

                await Post.findByIdAndUpdate(req.params.id, {
                    ...updatedFields,
                });
                console.log("Post Saved no img");

                return res.redirect("/admin/posts");
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

                const updatedFields = {
                    title: title,
                    category: category,
                    content: content,
                    links: links,
                    image: imageUrl,
                };

                await Post.findByIdAndUpdate(req.params.id, {
                    ...updatedFields,
                });
                console.log("Post Saved with img");

                return res.redirect("/admin/posts");
            });
            blobStream.end(file.buffer);
        } catch (error) {
            console.error(error);
        }
    })
);

// Delete entry POST
router.post(
    "/:id/delete",
    asyncHandler(async (req, res, next) => {
        await Post.findByIdAndDelete(req.params.id).exec();
        res.redirect("/admin/posts");
    })
);

// Hnadle Entry Delete delete on POST
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
    // Get details of bookinstance.
    const bookinstance = await BookInstance.findById(req.params.id)
        .populate("book")
        .exec();

    await BookInstance.findByIdAndDelete(req.body.bookinstanceid);
    res.redirect("/catalog/bookinstances");
});

module.exports = router;
