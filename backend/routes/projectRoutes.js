import express from "express";
import authUser from "../middleware/authMiddleware.js";
import { createProject, getAllProjects, getMyProjects, getProjectById, updateProject, deleteProject } from "../controllers/projectController.js";

const projectRouter = express.Router();

projectRouter.post("/create", authUser, createProject);
projectRouter.get("/all", getAllProjects);
projectRouter.get("/my", authUser, getMyProjects);
projectRouter.get("/:id", getProjectById);
projectRouter.put("/update/:id", authUser, updateProject);
projectRouter.delete("/delete/:id", authUser, deleteProject);

export default projectRouter;