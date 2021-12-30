import sqInst from "../util/database.js";
//import dotenv from "dotenv";
//dotenv.config();
//const Sequelize = require("sequelize");
import { Sequelize } from "sequelize";
const InvestmentOrder = sqInst.define("InvestmentOrder", {
    orderID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    investedAmount: {
        type: Sequelize.DOUBLE
    },
    investmentType: {
        type: Sequelize.STRING(10)
    }
}, { tableName: "InvestmentOrder" });

export default InvestmentOrder;