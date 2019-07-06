const User = require("../models/user.model");
module.exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userID) {
        User.findOne({ where: { id: req.session.userID } })
            .then(user => {
                req.user = user;
                next();
            })
            .catch(error => res.send(error));
    } else {
        res.send("Please Login first!");
    }
};
