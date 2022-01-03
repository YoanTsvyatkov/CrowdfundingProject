const dotenv=require("dotenv");
const { Sequelize } = require("sequelize");
const path = require("path");
const { fileURLToPath } = require( 'url');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "..", ".env")

dotenv.config({path: envPath});
const sqInst = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
});
module.exports.sqInst=sqInst;