import dotenv from "./server/dotenv"
import Investor from "./server/model/Investor.js";
import InvestmentOrder from "./server/model/InvestmentOrder.js";
import StartupProject from "./server/model/StartupCreator.js";
import StartupCreator from "./server/model/StartupCreator.js";
dotenv.config();
Investor.hasMany(InvestmentOrder, { foreignKey: 'investorID', sourceKey: 'ID' });
InvestmentOrder.belongsTo(Investor, { foreignKey: 'investorID', sourceKey: 'ID' });
StartupProject.hasMany(InvestmentOrder, { foreignKey: 'startupID', sourceKey: 'ID' });
InvestmentOrder.belongsTo(StartupProject, { foreignKey: 'startupID', sourceKey: 'ID' });
Investor.hasMany(InvestmentOrder);
StartupCreator.hasMany(StartupProject, {foreignKey: 'creatorID', sourceKey: 'profileID'});
StartupProject.belongsTo(StartupCreator, {foreignKey: 'creatorID', sourceKey: 'profileID'})

sqInst.sync({force: true}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});