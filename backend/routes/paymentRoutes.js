import express from "express";
import authUser from "../middleware/authMiddleware.js";
import {
    createOrder,
    demoPayment,
    verifyPayment
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", authUser, createOrder);

paymentRouter.post("/verify", authUser, verifyPayment);
paymentRouter.post("/demo-payment", authUser, demoPayment);

export default paymentRouter;