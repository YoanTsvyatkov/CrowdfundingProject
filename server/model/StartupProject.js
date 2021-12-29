import sqInst from "../util/database.js";
import { Sequelize } from "sequelize";
//import dotenv from "dotenv";
//dotenv.config();
//const Sequelize = require("sequelize");

const StartupProject = sqInst.define("StartupProject", {
    ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
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
}, { tableName: "StartupProject" });



export default StartupProject;