const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    loginHistory: [
        {
            timestamp: { type: Date, default: Date.now },
            ipAddress: { type: String },
        },
    ],
    createdAt: { type: Date, default: Date.now },
    secret: { type: String },
});

//Virtual for author's full name
UserSchema.virtual("name").get(function () {
    fullname = `${this.first_name} ${this.last_name}`;

    return fullname;
});

// Virtual for formatted creation date and time
UserSchema.virtual("formattedCreatedAt").get(function () {
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    return this.createdAt.toLocaleDateString("en-US", options);
});

// Virtual for loginHistory.timestamp
UserSchema.virtual("formattedLastLogin").get(function () {
    if (this.loginHistory.length > 0) {
        const lastLogin = this.loginHistory[this.loginHistory.length - 1];

        const lastLoginOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "America/Chicago",
        };

        return lastLogin.timestamp.toLocaleDateString(
            "en-US",
            lastLoginOptions
        );
    } else {
        return "No login history available.";
    }
});

// Export model
module.exports = mongoose.model("User", UserSchema);
