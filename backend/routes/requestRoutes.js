import express from "express";
import authUser from "../middleware/authMiddleware.js";
import {
    createRequest,
    getReceivedRequests,
    getSentRequests,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    deleteRequest
} from "../controllers/requestController.js";

const requestRouter = express.Router();

requestRouter.post("/create", authUser, createRequest);

requestRouter.get("/received", authUser, getReceivedRequests);

requestRouter.get("/sent", authUser, getSentRequests);

requestRouter.put("/accept/:id", authUser, acceptRequest);

requestRouter.put("/reject/:id", authUser, rejectRequest);

requestRouter.put("/cancel/:id", authUser, cancelRequest);

requestRouter.delete("/:id", authUser, deleteRequest);


export default requestRouter;