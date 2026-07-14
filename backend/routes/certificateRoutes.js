import express from "express";
import authUser from "../middleware/authMiddleware.js";
import {
    getCertificate,
    getMyCertificates,
    downloadCertificate
} from "../controllers/certificateController.js";

const certificateRouter = express.Router();

certificateRouter.get("/my", authUser, getMyCertificates);

certificateRouter.get("/pdf/:id", authUser, downloadCertificate);

certificateRouter.get("/:id", authUser, getCertificate);

export default certificateRouter;