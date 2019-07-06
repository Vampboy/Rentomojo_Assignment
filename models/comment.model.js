const Sequelize = require("sequelize");

const sequelize = require("../utils/db.util");

const Comment = sequelize.define("comment", {
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
    upvotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    downvotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    posted_by: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    posted_for: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Comment;
