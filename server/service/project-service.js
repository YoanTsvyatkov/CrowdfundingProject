import StartupProject from "./model/StartupProject.js";

class ProjectService {
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
        oldStartup.update({
            investmentGoal: startupProject.investmentGoal,
            descriptionOfIdea: startupProject.descriptionOfIdea,
            sharesIssue: startupProject.sharesIssued,
            moneyRaised: startupProject.moneyRaised,
            availableShares: startupProject.availableShares
        })
    }

    async deleteStartupProjectByID(ID) {
        const toDelete = await StartupProject.findOne({ where: { ID: ID } });
        toDelete.destroy();
    }
}

export default ProjectService