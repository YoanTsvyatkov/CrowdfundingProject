import express from "express";
import StartupProject from "../model/StartupProject.js";
import ProjectService from "../service/project-service.js";
const { Router } = express;
import dbInit from "../dbInit.js"
const projectController = Router();
const dbIn = require("../dbInit");
const { createStartup } = require("./model/StartupProject");
const projectservice = ProjectService();

projectController.post("/project", async (req, res) => {

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

projectController.get('/project/:title', (req, res) => {
    try {
        projectservice.getStartupProjectByTitle(req.params.title);
    } catch {
        err => {
            res.sendStatus(500);
        }
    }
})


projectController.put("/project", (req, res) => {
    projectservice.
        updateStartupProject(req.params.startupProject);
})


projectController.delete("/project/:id", (req, res) => {
    try {
        deleteStartupProjectByID(req.params.id);
    } catch {
        err => {
            res.sendStatus(500);
        }
    }
})

export default projectController;
