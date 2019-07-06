const express = require("express");
const router = express.Router();

// Controller
const { createPost } = require("../controllers/post.controller");

// Routes Import
const commentRoutes = require("./comment.route");

// Routes
router.get("/post").post("/post", createPost);
router.use("/:postID/comment", commentRoutes);

module.exports = router;
