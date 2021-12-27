import express from "express";
const { Router } = express;

const paymentController = Router();

paymentController.all("/hello", (req, res) => {
    res.send({
        message: "Hello world"
    })
})

export default paymentController;