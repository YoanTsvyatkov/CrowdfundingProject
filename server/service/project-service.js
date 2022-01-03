const { StartupProject } = require( "../model/StartupProject");

class ProjectService {

    async createStartup(investmentGoal, category, descriptionOfIdea,
        projectTitle, moneyRaised, sharesIssued, creatorID) {
        const priceOfOneShare = investmentGoal / sharesIssued;
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
        await startup.save();

        return startup.toJSON();
    }

    async getStartupProjectByTitle(title) {
        const startupInst = await StartupProject.findOne({ where: { projectTitle: title } });
        const startup = JSON.parse(JSON.stringify(startupInst));
        return startup;
    }


    async getStartupProjectByID(ID) {
        const startupInst = await StartupProject.findOne({ where: { ID: ID } });
        const startup = JSON.parse(JSON.stringify(startupInst));
        return startup;
    }

    async updateStartupProject(startupProject) {
        const oldStartup = await StartupProject.findOne({ where: { ID: startupProject.ID } });
        await oldStartup.update({
            investmentGoal: startupProject.investmentGoal,
            descriptionOfIdea: startupProject.descriptionOfIdea,
            sharesIssue: startupProject.sharesIssued,
            moneyRaised: startupProject.moneyRaised,
            availableShares: startupProject.availableShares
        })
        return oldStartup.toJSON();
    }

    async deleteStartupProjectByID(ID) {
        const toDelete = await StartupProject.findOne({ where: { ID: ID } });
        toDelete.destroy();
    }

    async getProjects() {
        const projects = JSON.parse(JSON.stringify(await StartupProject.findAll()));
        return projects;
    }
}

exports.ProjectService =  ProjectService;