import express from "express";
import authUser from "../middleware/authMiddleware.js";

import {
    getDashboard, getRecentActivity
} from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get(
    "/",
    authUser,
    getDashboard
);
dashboardRouter.get(
    "/recent-activity",
    authUser,
    getRecentActivity
);

export default dashboardRouter;