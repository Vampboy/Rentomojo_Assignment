const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.getSignup = (req, res) => {
    res.render("signup");
};

module.exports.postSignup = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    User.findOne({ where: { email: email } })
        .then(result => {
            if (!result) {
                bcrypt
                    .hash(password, 12)
                    .then(hashedPassword => {
                        User.create({
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            password: hashedPassword
                        })
                            .then(result =>
                                console.log("Successfully Created a new User!")
                            )
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.error(error));
            } else {
                console.log("User already Exists!");
            }
        })
        .catch(error => console.error(error));
};

module.exports.getLogin = (req, res) => {};

module.exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ where: { email: email } })
        .then(result => {
            if (result) {
                bcrypt
                    .compare(password, result.password)
                    .then(matched => {
                        if (matched) {
                            console.log("Logged In!");
                        } else {
                            console.log("Password doesn't match!");
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                console.log("User not Found!");
            }
        })
        .catch(error => console.error(error));
};
