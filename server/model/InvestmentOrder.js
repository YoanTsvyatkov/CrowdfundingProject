const sqInst = require("../util/database.mjs");
const { Sequelize } = require ("sequelize");

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

export default InvestmentOrder;