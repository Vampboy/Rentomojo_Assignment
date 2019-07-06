const Comment = require("../models/comment.model");

module.exports.postComment = (req, res) => {
    const { postID } = req.params;
    const { comment } = req.body;
    Comment.create({
        value: comment,
        posted_by: req.user.id,
        posted_for: postID
    })
        .then(result => res.json({ message: "Comment Posted Successfully!" }))
        .catch(error => res.send(error));
};

module.exports.getComments = (req, res) => {
    const { postID } = req.params;
    Comment.findAll({ where: { posted_for: postID } })
        .then(result => res.json({ data: result }))
        .catch(error => res.send(error));
};
