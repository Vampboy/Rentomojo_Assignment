const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const { postVote } = require("../controllers/vote.controller");

// Routes
router.post("/", postVote);

module.exports = router;
