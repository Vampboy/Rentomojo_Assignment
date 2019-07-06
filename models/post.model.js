const Sequelize = require("sequelize");

const sequelize = require("../utils/db.util");

const Post = sequelize.define("post", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    },
    posted_by: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Post;
