const { StartupProject } = require("../model/StartupProject");

class ProjectService {
    async createStartup(investmentGoal,
        category,
        descriptionOfIdea,
        projectTitle,
        moneyRaised,
        sharesIssued,
        creatorID) {
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

    async updateStartupProject(startupProject, id) {
        await StartupProject.update(startupProject, {
            where: { ID: id }
        })

        return await this.getStartupProjectByID(id)
    }

    async deleteStartupProjectByID(ID) {
        const toDelete = await StartupProject.findOne({ where: { ID: ID } });
        await toDelete.destroy();

        return toDelete.toJSON();
    }

    async getProjects() {
        const projects = JSON.parse(JSON.stringify(await StartupProject.findAll()));
        return projects;
    }
}

exports.ProjectService = ProjectService;