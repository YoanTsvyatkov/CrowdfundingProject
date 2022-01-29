const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { signToken } = require("../util/jwt.js");
const { UserService } = require("../service/user-service");

const authController = Router();
const userService = new UserService();

authController.post("/login", async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400);
    }

    try {
        const user = await userService.getUserByEmail(req.body.email);
        if (!user) {
            return res.sendStatus(404);
        }
        const isUserCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isUserCorrect) {
            return res.sendStatus(401).send();
        }

        const token = signToken(req.body.email, req.body.password, "24h")
        return res.send({
            token: token,
            id: user.profileID
        });
    } catch (error) {
        return res.sendStatus(500);
    }
});

authController.post("/register", async(req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.password ||
        !req.body.age || !req.body.occupation || !req.body.email || !req.body.phoneNumber ||
        !req.body.profileDescription) {
        return res.sendStatus(400);
    }

    try {
        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            return res.sendStatus(400);
        }
        const password = await bcrypt.hash(req.body.password, 10)
        const newUser = await userService.createUser(
            req.body.firstName,
            req.body.lastName,
            req.body.age,
            req.body.occupation,
            req.body.email,
            req.body.phoneNumber,
            req.body.profileDescription,
            password
        )
        const token = signToken(newUser.email, newUser.password, "24h")

        return res.send({
            token: token,
            id: newUser.profileID
        })
    } catch (error) {
        return res.sendStatus(500);
    }
});

exports.authController = authController;