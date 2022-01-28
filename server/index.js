const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { paymentController } = require("./routers/payment-controller");
const { sqInst } = require("./util/database");
const { User } = require("./model/User");
const { StartupProject } = require("./model/StartupProject");
const { InvestmentOrder } = require("./model/InvestmentOrder");
const { projectController } = require("./routers/startup-project-controller")
const { authController } = require("./routers/auth-controller");
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.static('client'));
app.use("/api/", paymentController)

function initRouters(path, routhers) {
    app.use(path, routhers);
}

app.use(bodyParser.json())
initRouters("/api/", [projectController, authController]);

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

(async() => {
    try {
        createRelationships()
        await sqInst.sync({ force: true })
        app.listen(process.env.PORT, () => {
            console.log(`Started server`);
        });
    } catch (error) {
        console.log(error)
    }
})();