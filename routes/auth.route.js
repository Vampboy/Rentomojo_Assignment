const express = require("express");
const router = express.Router();

// Controller
const {
    getSignup,
    postSignup,
    getLogin,
    postLogin
} = require("../controllers/auth.controller");

router
    .get("/login", getLogin)
    .post("/login", postLogin)
    .get("/signup", getSignup)
    .post("/signup", postSignup);

module.exports = router;
