import Request from "../models/Request.js";
import Project from "../models/Project.js";
import Conversation from "../models/Conversation.js";

const createRequest = async (req, res) => {

    try {

        const sender = req.user.userId;

        const { projectId, type, message, offerPrice } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        if (project.owner.toString() === sender) {
            return res.status(400).json({ success: false, message: "You cannot send request to your own project" });
        }
        if (
            type === "Ownership" &&
            project.adopted
        ) {
            return res.status(400).json({
                success: false,
                message: "Project has already been adopted."
            });
        }

        const alreadyRequested =
            await Request.findOne({

                project: projectId,

                sender,

                status: {
                    $in: [
                        "Pending",
                        "Accepted",
                        "Awaiting Payment",
                        "Completed"
                    ]
                }

            });

        if (alreadyRequested) {
            return res.status(400).json({ success: false, message: "Request already sent" });
        }

        const request = new Request({
            project: projectId,
            sender,
            receiver: project.owner,
            type,
            message,
            offerPrice,
            paymentRequired: project.price > 0
        });

        await request.save();

        return res.status(201).json({
            success: true,
            message: "Request sent successfully",
            request
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

const getReceivedRequests = async (req, res) => {

    try {

        const owner = req.user.userId;

        const requests = await Request.find({
            receiver: owner
        })
            .populate({
                path: "project",
                select: "title owner price projectType"
            })
            .populate(
                "sender",
                "name email github linkedin portfolio"
            )
            .populate({
                path: "certificate",
                populate: [
                    { path: "buyer" },
                    { path: "seller" },
                    { path: "project" },
                    { path: "payment" }
                ]
            })
            .populate("conversation")
            .sort({ createdAt: -1 });


        return res.status(200).json({
            success: true,
            requests
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getSentRequests = async (req, res) => {

    try {

        const requests = await Request.find({
            sender: req.user.userId
        }).populate(
            "project",
            "title owner price projectType adopted"
        )
            .populate("receiver", "name email")
            .populate({
                path: "certificate",
                populate: [
                    { path: "buyer" },
                    { path: "seller" },
                    { path: "project" },
                    { path: "payment" }
                ]
            })
            .populate("conversation")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            requests
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id);

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Request not found"
            });

        }

        if (request.sender.toString() !== req.user.userId) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });

        }

        request.status = "Cancelled";

        await request.save();

        return res.status(200).json({
            success: true,
            message: "Request cancelled"
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const acceptRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id)
            .populate("project");

        if (!request) {

            return res.status(404).json({

                success: false,

                message: "Request not found"

            });

        }


        if (request.status !== "Pending") {

            return res.status(400).json({

                success: false,
                message: "Request already processed."

            });

        }
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        if (request.receiver.toString() !== req.user.userId) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        if (request.type === "Ownership") {

            if (request.paymentRequired) {

                request.status = "Awaiting Payment";

            } else {

                request.status = "Completed";

                request.project.owner = request.sender;

                request.project.adopted = true;

                await request.project.save();
                await Request.updateMany(

                    {

                        project: request.project._id,

                        _id: {

                            $ne: request._id

                        },

                        type: "Ownership",

                        status: {

                            $in: [
                                "Pending",
                                "Awaiting Payment"
                            ]

                        }

                    },

                    {

                        status: "Rejected"

                    }

                );

            }

        } else {

            request.status = "Accepted";

        }

        await request.save();

        if (
            request.status === "Accepted" ||
            request.status === "Awaiting Payment" ||
            request.status === "Completed"
        ) {
            const alreadyExists = await Conversation.findOne({

                project: request.project._id,

                members: {
                    $all: [
                        request.sender,
                        request.receiver
                    ]
                }

            });

            if (!alreadyExists) {

                const conversation = await Conversation.create({

                    project: request.project._id,

                    members: [
                        request.sender,
                        request.receiver
                    ]

                });

                request.conversation = conversation._id;

                await request.save();

            } else {

                request.conversation = alreadyExists._id;

                await request.save();

            }
            console.log(
                `Conversation created for request ${request._id}`
            );
        }
        return res.status(200).json({
            success: true,
            message: "Request accepted successfully",
            request
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const rejectRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        if (request.receiver.toString() !== req.user.userId) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }
        if (request.conversation) {

            await Conversation.findByIdAndDelete(
                request.conversation
            );

            request.conversation = null;

        }
        request.status = "Rejected";

        await request.save();

        return res.status(200).json({
            success: true,
            message: "Request rejected",
            request
        });

    }

    catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const cancelRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        if (request.sender.toString() !== req.user.userId) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        request.status = "Cancelled";

        await request.save();

        return res.status(200).json({

            success: true,

            message: "Request cancelled"

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
    createRequest,
    getReceivedRequests,
    getSentRequests,
    acceptRequest,
    rejectRequest,
    cancelRequest,
    deleteRequest
};