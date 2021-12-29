//import dotenv from "./server/node_modules/dotenv"
import sqInst from "./util/database.js" ;
import Investor from "./model/Investor.js";
import InvestmentOrder from "./model/InvestmentOrder.js";
import StartupProject from "./model/StartupProject.js";
import StartupCreator from "./model/StartupCreator.js";
//const Investor = require("./model/Investor");
//const InvestmentOrder = require("./model/InvestmentOrder");
//const StartupProject = require("./model/StartupProject");
//const StartupCreator = require("./model/StartupCreator");
//dotenv.config();
Investor.hasMany(InvestmentOrder, { foreignKey: 'investorID', sourceKey: 'ID' });
InvestmentOrder.belongsTo(Investor, { foreignKey: 'investorID', sourceKey: 'ID' });
StartupProject.hasMany(InvestmentOrder, { foreignKey: 'startupID', sourceKey: 'ID' });
InvestmentOrder.belongsTo(StartupProject, { foreignKey: 'startupID', sourceKey: 'ID' });
StartupCreator.hasMany(StartupProject, {foreignKey: 'creatorID', sourceKey: 'profileID'});
StartupProject.belongsTo(StartupCreator, {foreignKey: 'creatorID', sourceKey: 'profileID'})

sqInst.sync({force: true}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});