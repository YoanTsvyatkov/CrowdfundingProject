const express = require("express");
const dotenv = require("dotenv");
const cors =require("cors");
const payment = require("./routers/payment-controller.js");
const sqInst = require ("./util/database.mjs");
const User = require ("./model/User.js");
const StartupProject = require("./model/StartupProject.js");
const InvestmentOrder = require("./model/InvestmentOrder.js");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

function initRouters(path, routhers) {
  app.use(path, routhers);
}

initRouters("/api/", [payment]);

app.all("/*", (req, res) => {
  res.sendStatus(404);
});

const createRelationships = () => {
  StartupProject.hasMany(InvestmentOrder, { foreignKey: 'startupID', sourceKey: 'ID' });
  StartupProject.belongsTo(User, { foreignKey: 'creatorID', sourceKey: 'profileID' });
  InvestmentOrder.belongsTo(User, { foreignKey: 'userID', sourceKey: 'profileID' });
  InvestmentOrder.belongsTo(StartupProject, { foreignKey: 'startupID', sourceKey: 'ID' });
  User.hasMany(InvestmentOrder, { foreignKey: 'userID', sourceKey: 'profileID' });
  User.hasMany(StartupProject, { foreignKey: 'creatorID', sourceKey: 'profileID' });
}

(async () => {
  try {
    createRelationships()
    await sqInst.sync({ force: true })
    // createUser("Jack", "Murry", 32, "electrical engineer", "jack.murry@gmail.com", "0123456789", "");
    app.listen(process.env.PORT, () => {
      console.log(`Started server`);
    });
  } catch (error) {
    console.log(error)
  }
})();
