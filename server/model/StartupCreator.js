//import sqInst from "../util/database.js";
import dotenv from "dotenv";
dotenv.config();

const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");

const StartupCreator = sqInst.define("StartupCreator", {

    profileID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: Sequelize.STRING(10)
    },
    lastName: {
        type: Sequelize.STRING(10)
    },
    age: {
        type: Sequelize.INTEGER
    },
    occupation: {
        type: Sequelize.STRING(20)
    },
    email: {
        type: Sequelize.STRING(25)
    },
    phoneNumber: {
        type: Sequelize.STRING(10)
    },
    profileDescription: {
        type: Sequelize.STRING(100)
    },
    startupID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false
        //foreign key
    }
}, { tableName: "StartupCreator" });



module.exports = StartupCreator;