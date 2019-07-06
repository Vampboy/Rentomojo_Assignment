const Vote = require("../models/vote.model");
const Comment = require("../models/comment.model");

module.exports.postVote = (req, res) => {
    const { commentID } = req.params;
    const { vote } = req.body;
    Comment.findOne({ where: { id: commentID } })
        .then(result => {
            if (result.posted_by != req.user.id) {
                if (vote == "u" || vote == "U") {
                    Vote.findOne({
                        where: {
                            $and: [
                                { posted_by: req.user.id },
                                { posted_for: commentID }
                            ]
                        }
                    })
                        .then(result => {
                            if (!result) {
                                Comment.update(
                                    { upvotes: result.upvotes + 1 },
                                    { where: { id: commentID } }
                                )
                                    .then(result => {
                                        Vote.create({
                                            upvote: 1,
                                            downvote: 0,
                                            voted_by: req.user.id,
                                            voted_for: commentID
                                        })
                                            .then(result =>
                                                res.json({
                                                    message: "Upvoted!"
                                                })
                                            )
                                            .catch(error => res.send(error));
                                    })
                                    .catch(error => res.send(error));
                            } else {
                                res.json({ message: "Already Upvoted!" });
                            }
                        })
                        .catch(error => res.send(error));
                } else if (vote == "d" || vote == "D") {
                    Vote.findOne({
                        where: {
                            $and: [
                                { posted_by: req.user.id },
                                { posted_for: commentID }
                            ]
                        }
                    })
                        .then(result => {
                            if (!result) {
                                Comment.update(
                                    { downvotes: result.downvotes + 1 },
                                    { where: { id: commentID } }
                                )
                                    .then(result => {
                                        Vote.create({
                                            upvote: 0,
                                            downvote: 1,
                                            voted_by: req.user.id,
                                            voted_for: commentID
                                        })
                                            .then(result =>
                                                res.json({
                                                    message: "Downvoted!"
                                                })
                                            )
                                            .catch(error => res.send(error));
                                    })
                                    .catch(error => res.send(error));
                            } else {
                                res.json({ message: "Already Downvoted!" });
                            }
                        })
                        .catch(error => res.send(error));
                }
            } else {
                res.json({
                    message: "Cannot Upvote/Downvote on your own Comment!"
                });
            }
        })
        .catch(error => res.send(error));
};
