const express = require("express");
const router = express.Router();

// Controller
const { createPost, getPosts } = require("../controllers/post.controller");

// Middlewares
const { isAuthenticated } = require("../middlewares/auth.middleware");

// Routes Import
const commentRoutes = require("./comment.route");

// Routes
router
    .get("/", isAuthenticated, getPosts)
    .post("/", isAuthenticated, createPost);
router.use("/:postID/comment", isAuthenticated, commentRoutes);

module.exports = router;
