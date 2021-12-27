const Sequelize = require("sequelize");
    const sqInst = require("../util/database");

    const Investor = sqInst.define("Investor", {
        ID: {
            type: Sequelize.CHAR(10),
            primaryKey:true,
            allowNull:false,
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
    }, {tableName: "Investor"});

    module.exports = Investor;