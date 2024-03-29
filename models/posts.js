const mongoose = require("mongoose");
const moment = require("moment-timezone");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author_name: { type: String },
    content: { type: String },
    createdAt: { type: Date, default: Date.now },
    approved: { type: String },
});

// Virtual for comment createdAt format
CommentSchema.virtual("formattedCreatedAt").get(function () {
    // Define Timezone
    const timeZone = "America/Chicago";

    // Format the date with specific options and timezone
    const formattedDate = moment(this.createdAt)
        .tz(timeZone)
        .format("MMM D, YYY [at] h:mm A");

    return formattedDate;
});

const PostSchema = new Schema({
    title: { type: String },
    content: { type: String },
    createdAt: { type: Date, default: Date.now },
    image: { type: String },
    category: { type: String },
    comments: [CommentSchema],
    links: [{ type: String }],
});

// Virtual for post createdAt format
PostSchema.virtual("formattedCreatedAt").get(function () {
    // Define Timezone
    const timeZone = "America/Chicago";

    // Format the date with specific options and timezone
    const formattedDate = moment(this.createdAt)
        .tz(timeZone)
        .format("MMM D, YYYY");

    return formattedDate;
});

module.exports = mongoose.model("Post", PostSchema);
