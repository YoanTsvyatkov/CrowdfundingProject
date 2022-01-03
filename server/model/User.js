import sqInst from "../util/database.js";
import { Sequelize } from "sequelize";
import InvestmentOrder from "./model/InvestmentOrder.js";
import StartupProject from "./model/StartupProject.js";

const User = sqInst.define("User", {

    profileID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER
    },
    occupation: {
        type: Sequelize.STRING(20)
    },
    email: {
        type: Sequelize.STRING(25),
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: true
    },
    profileDescription: {
        type: Sequelize.STRING(100)
    }

}, { tableName: "User" });

User.hasMany(InvestmentOrder, { foreignKey: 'userID', sourceKey: 'profileID' });
User.hasMany(StartupProject, { foreignKey: 'creatorID', sourceKey: 'profileID' });

export default User;