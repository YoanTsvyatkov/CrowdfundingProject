const Sequelize = require("sequelize");
const sqInst = require("../util/database");

const StartupProject = sqInst.define("StartupProject", {
    ID: {
        type: Sequelize.CHAR(10),
        primaryKey: true,
        allowNull: false
    },
    investmentGoal: {
        type: Sequelize.DOUBLE
    },
    category: {
        type: Sequelize.STRING(20)
    },
    descriptionOfIdea: {
        type: Sequelize.STRING(100)
    },
    projectTitle: {
        type: Sequelize.STRING(30)
    },
    moneyRaised: {
        type: Sequelize.DOUBLE
    },
    sharesIssued: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {tableName: "StartupProject"});

module.exports = StartupProject;