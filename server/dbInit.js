const sqInst = require("./server/util/database");

const Investor = require("./server/model/Investor");
const InvestmentOrder = require("./server/model/InvestmentOrder");

Investor.hasMany(InvestmentOrder);

sqInst.sync({force: true}).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});