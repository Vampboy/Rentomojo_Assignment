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
                                res.json({
                                    message: "Successfully Created a new User!"
                                })
                            )
                            .catch(error => res.send(error));
                    })
                    .catch(error => res.send(error));
            } else {
                res.json({ message: "User already Exists!" });
            }
        })
        .catch(error => res.send(error));
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
                            req.session.userID = result.id;
                            res.json({ message: "Logged In!" });
                        } else {
                            res.json({ message: "Password doesn't match!" });
                        }
                    })
                    .catch(error => res.send(error));
            } else {
                res.json({ message: "User not Found!" });
            }
        })
        .catch(error => res.send(error));
};
