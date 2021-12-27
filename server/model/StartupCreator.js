

const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
const sqInst = require("../util/database");

const StartupCreator = sqInst.define("StartupCreator", {
    
    profileID: {
        type: Sequelize.CHAR(10),
        primaryKey: true,
        allowNull: false
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
    phoneNumber:{
        type: Sequelize.STRING(10)
    },
    profileDescription: {
        type: Sequelize.STRING(100)
    },
    startupID: {
        type: Sequelize.CHAR(10),
        allowNull: false
        //foreign key
    }
}, {tableName: "StartupCreator"});

module.exports = StartupCreator;