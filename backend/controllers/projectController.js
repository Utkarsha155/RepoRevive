import Project from "../models/Project.js";
import validator from "validator";

const createProject = async (req, res) => {

    try {

        const owner = req.user.userId;

        const {
            title,
            description,
            category,
            techStack,
            githubLink,
            liveLink,
            image,
            readme,
            projectType,
            compensationType,
            price,
            negotiable,
            difficulty,
            lookingFor,
            tags
        } = req.body;

        if (
            !title ||
            !description ||
            !category ||
            !githubLink ||
            !projectType
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });

        }

        if (!validator.isURL(githubLink) || !githubLink.includes("github.com")) {
            return res.status(400).json({ success: false, message: "Invalid GitHub Link" });
        }

        if (liveLink && !validator.isURL(liveLink)) {
            return res.status(400).json({ success: false, message: "Invalid Live Link" });
        }

        if (price < 0) {
            return res.status(400).json({ success: false, message: "Price cannot be negative" });
        }

        const finalTechStack = Array.isArray(techStack)
            ? techStack
            : techStack.split(",").map(item => item.trim());

        const finalTags = Array.isArray(tags)
            ? tags
            : tags.split(",").map(item => item.trim());


        const newProject = new Project({
            owner,
            title,
            description,
            category,
            techStack: finalTechStack,
            githubLink,
            liveLink,
            image,
            readme,
            projectType,
            compensationType,
            price,
            negotiable,
            difficulty,
            lookingFor,
            tags: finalTags
        });

        const savedProject = await newProject.save();

        return res.status(201).json({
            success: true,
            message: "Project uploaded successfully",
            project: savedProject
        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getAllProjects = async (req, res) => {

    try {

        const projects = await Project.find({ adopted: false })
            .populate("owner", "name email github linkedin portfolio")

        return res.status(200).json({

            success: true,

            projects

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getMyProjects = async (req, res) => {

    try {

        const owner = req.user.userId;

        const projects = await Project.find({ owner });

        return res.status(200).json({

            success: true,

            projects

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getProjectById = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id)
            .populate(
                "owner",
                "name email github linkedin portfolio phone address"
            );

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        project.views += 1;

        await project.save();

        return res.status(200).json({

            success: true,

            project

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const updateProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        if (project.owner.toString() !== req.user.userId) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        Object.assign(project, req.body);

        await project.save();

        return res.status(200).json({

            success: true,

            message: "Project updated successfully",

            project

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const deleteProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project not found"

            });

        }

        if (project.owner.toString() !== req.user.userId) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        await project.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Project deleted successfully"

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export {

    createProject,

    getAllProjects,

    getMyProjects,

    getProjectById,

    updateProject,

    deleteProject

};

