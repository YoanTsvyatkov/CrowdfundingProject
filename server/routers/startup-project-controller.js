const express = require("express");
const { ProjectService } = require("../service/project-service.js");
const { Router } = express;
const projectController = Router();
const projectService = new ProjectService();

projectController.post("/project",
    async(req, res) => {
        if ((req.body.investmentGoal == 'undefined') ||
            !req.body.category ||
            !req.body.descriptionOfIdea ||
            !req.body.projectTitle ||
            (req.body.moneyRaised == 'undefined') ||
            (req.body.sharesIssued == 'undefined') ||
            (req.body.availableShares == 'undefined') ||
            !req.body.creatorID) {
            return res.sendStatus(400);
        }

        try {
            const project = await projectService.createStartup(
                req.body.investmentGoal,
                req.body.category,
                req.body.descriptionOfIdea,
                req.body.projectTitle,
                req.body.moneyRaised,
                req.body.sharesIssued,
                req.body.creatorID);

            return res.send(project);
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    })

projectController.get("/project", async(req, res) => {
    try {
        const projects = await projectService.getProjects()
        return res.send(projects);
    } catch (error) {
        return res.sendStatus(500);
    }
})

projectController.put("/project/:id", async(req, res) => {
    const project = await projectService.updateStartupProject(req.body, req.params.id);
    return res.send(project);
})

projectController.delete("/project/:id", async(req, res) => {
    try {
        const project = await projectService.getStartupProjectByID(req.params.id);
        if (project == null) {
            return res.sendStatus(404);
        }

        await projectService.deleteStartupProjectByID(req.params.id);
        return res.send(project);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

exports.projectController = projectController;