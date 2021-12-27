    const Sequelize = require("sequelize");
    const sqInst = require("../util/database");

    const InvestmentOrder = sqInst.define("InvestmentOrder", {
        orderID: {
            type: Sequelize.CHAR(10),
            primaryKey: true,
            allowNull: false
        },
        startupID:
        {
            type: Sequelize.CHAR(10),
            allowNull: false
            //foreign key
        },

        investorID: {
            type: Sequelize.CHAR(10),
            allowNull: false
            //foreign key
        },
        investedAmount: {
            type: Sequelize.DOUBLE
        },
        sharesBought: {
            type: Sequelize.DOUBLE
        },
        investmentType: {
            type: Sequelize.STRING(10)
        }
    }, {tableName: "InvestmentOrder"});

    module.exports = InvestmentOrder;
    