const { sqInst } = require("../util/database");
const { Sequelize } = require("sequelize");

const User = sqInst.define("User", {
    profileID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER
    },
    occupation: {
        type: Sequelize.STRING(100)
    },
    email: {
        type: Sequelize.STRING(25),
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    profileDescription: {
        type: Sequelize.STRING(300)
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { tableName: "User" });

exports.User = User;