const Sequelize = require("sequelize");

const sequelize = require("../utils/db.util");

const Vote = sequelize.define("vote", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    upvote: {
        type: Sequelize.ENUM(0, 1),
        allowNull: false
    },
    downvote: {
        type: Sequelize.ENUM(0, 1),
        allowNull: false
    },
    voted_by: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    voted_for: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Vote;
