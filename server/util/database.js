const Sequelize = require("sequelize");

const sqInst = new Sequelize("test_schema", "root", "sebiz1234", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sqInst;