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
                            voted_by: req.user.id,
                            voted_for: commentID
                        }
                    })
                        .then(voted => {
                            if (!voted) {
                                Comment.update(
                                    { upvotes: result.upvotes + 1 },
                                    { where: { id: commentID } }
                                )
                                    .then(upvoted => {
                                        Vote.create({
                                            upvote: "1",
                                            downvote: "0",
                                            voted_by: req.user.id,
                                            voted_for: commentID
                                        })
                                            .then(upvote =>
                                                res.json({
                                                    message: "Upvoted!"
                                                })
                                            )
                                            .catch(error => res.send(error));
                                    })
                                    .catch(error => res.send(error));
                            } else {
                                res.json({ message: "Already Voted!" });
                            }
                        })
                        .catch(error => res.json({ error: `${error}` }));
                } else if (vote == "d" || vote == "D") {
                    Vote.findOne({
                        where: {
                            voted_by: req.user.id,
                            voted_for: commentID
                        }
                    })
                        .then(vote => {
                            if (!vote) {
                                Comment.update(
                                    { downvotes: result.downvotes + 1 },
                                    { where: { id: commentID } }
                                )
                                    .then(downvoted => {
                                        Vote.create({
                                            upvote: 0,
                                            downvote: 1,
                                            voted_by: req.user.id,
                                            voted_for: commentID
                                        })
                                            .then(downvote =>
                                                res.json({
                                                    message: "Downvoted!"
                                                })
                                            )
                                            .catch(error => res.send(error));
                                    })
                                    .catch(error => res.send(error));
                            } else {
                                res.json({ message: "Already Voted!" });
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
