import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// dotenv.config({path: '../.env'});
const sqInst = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
});
export default sqInst;