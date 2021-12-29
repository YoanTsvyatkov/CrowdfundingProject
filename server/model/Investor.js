//import sqInst from "../util/database.js";
import dotenv from "dotenv";
dotenv.config();
const Sequelize = require("sequelize");

const Investor = sqInst.define("Investor", {
    ID: {
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
    email: {
        type: Sequelize.STRING(25)
    }
}, { tableName: "Investor" });



module.exports = Investor;