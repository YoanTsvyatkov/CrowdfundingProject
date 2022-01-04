const { InvestmentOrder } = require("../model/InvestmentOrder")
const { ProjectService } = require("../service/project-service");

const projectService = new ProjectService();

class PaymentService {
    async createInvestmentOrder(investedAmount, investmentType, investorID, startupID) {
        const investmentOrder = InvestmentOrder.build({
            investedAmount: investedAmount,
            investmentType: investmentType,
            userID: investorID,
            startupID: startupID
        });
        investmentOrder.save();
    }


    async getInvestmentOrderByID(ID) {
        const investmentOrderInst = await InvestmentOrder.findOne({ where: { orderID: ID } });
        const investmentOrder = JSON.parse(JSON.stringify(investmentOrderInst));
        return investmentOrder;
    }

    async invest(amount, startupId, userID) {
        const startupProject = await projectService.getStartupProjectByID(startupId);
        let availableShares = startupProject.availableShares;
        const amountOfShares = amount / startupProject.priceOfOneShare;
        availableShares -= amountOfShares;
        if (availableShares > 0) {
            startupProject.availableShares = availableShares;
        } else {
            throw "Not enough shares"
        }

        startupProject.moneyRaised += amount;
        await projectService.updateStartupProject(startupProject);
        const order = await createInvestmentOrder(amount, "buy", userID, startupProject.ID);
        return JSON.parse(JSON.stringify(order));
    }
}

exports.PaymentService = PaymentService