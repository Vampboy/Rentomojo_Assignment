const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const { postVote } = require("../controllers/vote.controller");

router.post("/", postVote);

module.exports = router;
