const express = require("express");
const { UserService } = require("../service/user-service.js");
const { Router } = express;

const userController = Router();
const userService = new UserService();

userController.get("/user/:id", async(req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.sendStatus(404);
        }
        res.send(user);
    } catch (err) {
        res.sendStatus(500);
    }
})

exports.userController = userController