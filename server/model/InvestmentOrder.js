import sqInst from "../util/database.js";
import { Sequelize } from "sequelize";
import User from "./User.js";
import StartupProject from "./StartupProject.js";

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
    },
    userID: {
        type: Sequelize.UUID, // The data type defined here and 
        references: {
           model: 'User',
           key: 'profileID'
        }
     },
     startupID:{
        type: Sequelize.UUID, // The data type defined here and 
        references: {
           model: 'StartupProject',
           key: 'ID'
        }
     }

}, { tableName: "InvestmentOrder" });

InvestmentOrder.belongsTo(User, { foreignKey: 'userID', sourceKey: 'profileID' });
InvestmentOrder.belongsTo(StartupProject, { foreignKey: 'startupID', sourceKey: 'ID' });

export default InvestmentOrder;