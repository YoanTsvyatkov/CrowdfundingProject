import sqInst from "../util/database.js";
//import dotenv from "dotenv";
//dotenv.config();
//const Sequelize = require("sequelize");
import { Sequelize } from "sequelize";

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



export default Investor;