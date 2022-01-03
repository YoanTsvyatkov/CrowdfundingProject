const { sqInst } = require("../util/database");
const { Sequelize } = require("sequelize");

const StartupProject = sqInst.define("StartupProject", {
    ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    investmentGoal: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    descriptionOfIdea: {
        type: Sequelize.STRING(100)
    },
    projectTitle: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    moneyRaised: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    sharesIssued: {
        type: Sequelize.DOUBLE,
        defaultValue: 10000
    },
    priceOfOneShare: {
        type: Sequelize.DOUBLE
    },
    availableShares: {
        type: Sequelize.DOUBLE,
        defaultValue: 10000
    },
    creatorID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: 'profileID'
        }
    }
}, { tableName: "StartupProject" });

exports.StartupProject = StartupProject;