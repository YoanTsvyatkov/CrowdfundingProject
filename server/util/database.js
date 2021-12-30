//const Sequelize = require("sequelize");
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
/*
const sqInst = new Sequelize("test_schema", "root", "sebiz1234", {
    dialect: "mysql",
    host: "localhost",
});
*/
dotenv.config({path: './.env'});
const sqInst = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
});
export default sqInst;