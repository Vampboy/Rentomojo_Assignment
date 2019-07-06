const Post = require("../models/post.model");

module.exports.createPost = (req, res) => {
    const { post } = req.body;
    Post.create({
        value: post,
        posted_by: req.user.id
    })
        .then(result => res.json({ message: "Post Created Successfully!" }))
        .catch(error => res.send(error));
};

module.exports.getPosts = (req, res) => {
    const { postID } = req.params;
    Post.findAll()
        .then(result => res.json({ data: result }))
        .catch(error => res.send(error));
};
