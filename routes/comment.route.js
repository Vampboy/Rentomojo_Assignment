const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const {
    postComment,
    getComments
} = require("../controllers/comment.controller");

// Routes Import
const voteRoutes = require("./vote.route");

// Routes
router.get("/", getComments).post("/", postComment);
router.use("/:commentID/vote", voteRoutes);

module.exports = router;
