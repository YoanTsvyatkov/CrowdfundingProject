//const Sequelize = require("sequelize");
import { Sequelize } from "sequelize";

const sqInst = new Sequelize("test_schema", "root", "sebiz1234", {
    dialect: "mysql",
    host: "localhost",
});

export default sqInst;