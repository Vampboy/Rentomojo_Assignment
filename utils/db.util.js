const Sequelize = require("sequelize");

const sequelize = new Sequelize("comment_system", "root", "", {
    host: "localhost",
    dialect: "mysql",
    timestamps: true
});

module.exports = sequelize;
