const sequelize = require("sequelize");

const connection = new sequelize("provanode", "root", "", {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
})

module.exports = connection;