const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");

const port = process.env.PORT || 5000;

const sequelize = require("./utils/db.util");
sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "public"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
    session({
        secret: "SECRET",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
            secure: false
        }
    })
);

app.listen(port, () => {
    console.log(`App Server Started on ${port}`);
});

// Route Imports
const authRoutes = require("./routes/auth.route");
const postRoutes = require("./routes/post.route");

// Routes
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
