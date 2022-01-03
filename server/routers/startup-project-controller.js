const express = require("express");
const { StartupProject } = require("../model/StartupProject.js");
const { ProjectService } = require("../service/project-service.js");
const { Router } = express;
const projectController = Router();
const projectservice = new ProjectService();

projectController.post("/project", async(req, res) => {

    if (!req.body.investmentGoal ||
        !req.body.category ||
        !req.body.descriptionOfIdea ||
        !req.body.projectTitle ||
        !req.body.moneyRaised ||
        !req.body.sharesIssued ||
        !req.body.priceOfOneShare ||
        !req.body.availableShares ||
        !req.body.creatorID) {
        return res.sendStatus(400);
    }
    const project = await projectservice.createStartup(req.body.ID, req.body.investmentGoal,
        req.body.category, req.body.descriptionOfIdea,
        req.body.projectTitle, req.body.moneyRaised,
        req.body.sharesIssued, req.body.priceOfOneShare,
        req.body.availableShares, req.body.creatorID);

    return res.send(project);
})


projectController.put("/project", (req, res) => {
    const project = projectservice.updateStartupProject(req.params.startupProject);
    return res.send(project);
})





projectController.delete("/project/:id", (req, res) => {
    try {
        projectController.deleteStartupProjectByID(req.params.id);

    } catch {
        err => {
            res.sendStatus(500);
        }
    }
})

exports.projectController = projectController;