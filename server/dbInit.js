import User from "./model/User.js";
import InvestmentOrder from "./model/InvestmentOrder.js";
import StartupProject from "./model/StartupProject.js";

//CREATE
async function createStartup(investmentGoal, category, descriptionOfIdea, 
    projectTitle, moneyRaised, sharesIssued,creatorID)
{
    const priceOfOneShare = investmentGoal/sharesIssued;
    const startup = StartupProject.build({
        investmentGoal: investmentGoal, 
        category: category, 
        descriptionOfIdea: descriptionOfIdea, 
        projectTitle: projectTitle, 
        moneyRaised: moneyRaised,
        sharesIssue: sharesIssued,
        priceOfOneShare: priceOfOneShare,
        availableShares: sharesIssued,
        creatorID: creatorID
    });
    startup.save();
}

async function createUser(firstName, lastName, age, occupation, email, phoneNumber, profileDescription)
{
    const user = User.build({
        firstName: firstName, 
        lastName: lastName, 
        age: age,
        occupation: occupation, 
        email: email, 
        phoneNumber: phoneNumber, 
        profileDescription: profileDescription
    });
    user.save();
}

async function createInvestmentOrder(investedAmount, investmentType, investorID, startupID){
    const investmentOrder = InvestmentOrder.build({
        investedAmount: investedAmount, 
        investmentType: investmentType,
        userID: investorID,
        startupID: startupID
    });
    investmentOrder.save();
}

// GETTERS
async function getUserByEmail(email){   
    const investorInst = await User.findOne({where: {email: email}});
    const investor = JSON.parse(JSON.stringify(investorInst));
    console.log(investor.profileID);
    return investor;
}

async function getStartupProjectByTitle(title)
{
    const startupInst = await StartupProject.findOne({where: {projectTitle: title}});
    const startup = JSON.parse(JSON.stringify(startupInst));
    return startup;
}

async function getStartupProjectByID(ID)
{
    const startupInst = await StartupProject.findOne({where: {ID: ID}});
    const startup = JSON.parse(JSON.stringify(startupInst));
    return startup;
}

async function getInvestmentOrderByID(ID)
{
    const investmentOrderInst = await InvestmentOrder.findOne({where: {orderID: ID}});
    const investmentOrder = JSON.parse(JSON.stringify(investmentOrderInst));
    return investmentOrder;
}

////UPDATE
async function updateStartupProject(startupProject)
{
    const oldStartup = await StartupProject.findOne({where: {ID: startupProject.ID}});
    oldStartup.update({
        investmentGoal: startupProject.investmentGoal, 
        descriptionOfIdea: startupProject.descriptionOfIdea, 
        sharesIssue: startupProject.sharesIssued,
        moneyRaised: startupProject.moneyRaised,
        availableShares: startupProject.availableShares})
}

async function updateUser(user)
{
    const oldUser = await User.findOne({where: {profileID: user.profileID}});
    oldUser.update({
        firstName: user.firstName, 
        lastName: user.lastName, 
        age: user.age,
        occupation: user.occupation, 
        email: user.email, 
        phoneNumber: user.phoneNumber, 
        profileDescription: user.profileDescription})
}

// DELETE

async function deleteUserByID(ID)
{
    const toDelete = await User.findOne({where: {profileID: ID}});
    toDelete.destroy();
}

async function deleteStartupProjectByID(ID)
{
    const toDelete = await StartupProject.findOne({where: {ID: ID}});
    toDelete.destroy();
}


///TRANSACTIONS

async function invest(amount, projectTitle, userID)
{
    const startupProject = await getStartupProjectByTitle(projectTitle);
    var availableShares = startupProject.availableShares;
    const amountOfShares = amount/startupProject.priceOfOneShare;
    availableShares -= amountOfShares;
    startupProject.availableShares = availableShares;
    startupProject.moneyRaised += amount;
    updateStartupProject(startupProject);
    createInvestmentOrder(amount, "buy", userID, startupProject.ID);
}

function availableShares(moneyRaised, priceOfOneShare, sharesIssued)
{
    const availableShares = sharesIssued - (moneyRaised/priceOfOneShare);
    return availableShares;
}