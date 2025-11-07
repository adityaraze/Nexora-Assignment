const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Mock User" },
    email: { type: String, default: "mock@vibe.com" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
