import Project from "../models/Project.js";
import Request from "../models/Request.js";
import Conversation from "../models/Conversation.js";
import Certificate from "../models/Certificate.js";
import Message from "../models/Message.js";
import Payment from "../models/Payment.js";


const getDashboard = async (req, res) => {

    try {

        const userId = req.user.userId;

        // ==============================
        // Stats
        // ==============================

        const totalProjects = await Project.countDocuments({
            owner: userId
        });
        const totalMarketplaceProjects = await Project.countDocuments({
            adopted: false
        });
        const totalReceivedRequests = await Request.countDocuments({
            receiver: userId
        });

        const totalSentRequests = await Request.countDocuments({
            sender: userId
        });

        const totalConversations = await Conversation.countDocuments({
            members: userId
        });

        const totalCertificates = await Certificate.countDocuments({

            $or: [

                {
                    buyer: userId
                },

                {
                    seller: userId
                }

            ]

        });

        // ==============================
        // Recent Projects
        // ==============================

        const recentProjects = await Project.find({

            owner: userId

        })

            .sort({

                createdAt: -1

            })

            .limit(5)

            .select(

                "title category projectType adopted price createdAt"

            );

        // ==============================
        // Recent Requests
        // ==============================

        const recentRequests = await Request.find({

            $or: [

                {
                    sender: userId
                },

                {
                    receiver: userId
                }

            ]

        })

            .populate("project", "title")

            .populate("sender", "name")

            .populate("receiver", "name")

            .sort({

                createdAt: -1

            })

            .limit(5);

        // ==============================
        // Recent Conversations
        // ==============================

        const recentConversations = await Conversation.find({

            members: userId

        })

            .populate("members", "name profileImage")

            .populate("project", "title")

            .sort({

                lastMessageAt: -1

            })

            .limit(5);

        // ==============================
        // Recent Certificates
        // ==============================

        const recentCertificates = await Certificate.find({

            $or: [

                {
                    buyer: userId
                },

                {
                    seller: userId
                }

            ]

        })

            .populate("buyer", "name")

            .populate("seller", "name")

            .populate("project", "title")

            .sort({

                createdAt: -1

            })

            .limit(5);

        return res.status(200).json({

            success: true,

            stats: {

                totalProjects,

                totalMarketplaceProjects,

                totalReceivedRequests,

                totalSentRequests,

                totalConversations,

                totalCertificates

            },

            recentProjects,

            recentRequests,

            recentConversations,

            recentCertificates

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



const getRecentActivity = async (req, res) => {

    try {

        const userId = req.user.userId;

        const activities = [];

        // Latest Requests

        const requests = await Request.find({

            $or: [
                { sender: userId },
                { receiver: userId }
            ]

        })
            .populate("project", "title")
            .sort({ updatedAt: -1 })
            .limit(5);

        requests.forEach((request) => {

            activities.push({

                type: "request",

                title: `Request ${request.status}`,

                description: `${request.project?.title}`,

                time: request.updatedAt

            });

        });

        // Latest Messages

        const messages = await Message.find({

            $or: [
                { sender: userId },
                { receiver: userId }
            ]

        })
            .sort({ createdAt: -1 })
            .limit(5);

        messages.forEach((message) => {

            activities.push({

                type: "message",

                title: "New Message",

                description: message.text,

                time: message.createdAt

            });

        });

        // Latest Payments

        const payments = await Payment.find({

            $or: [
                { buyer: userId },
                { seller: userId }
            ]

        })
            .sort({ createdAt: -1 })
            .limit(5);

        payments.forEach((payment) => {

            activities.push({

                type: "payment",

                title: "Payment Successful",

                description: `₹${payment.amount}`,

                time: payment.createdAt

            });

        });

        // Latest Certificates

        const certificates = await Certificate.find({

            $or: [
                { buyer: userId },
                { seller: userId }
            ]

        })
            .populate("project", "title")
            .sort({ issuedAt: -1 })
            .limit(5);

        certificates.forEach((certificate) => {

            activities.push({

                type: "certificate",

                title: "Certificate Generated",

                description: certificate.project?.title,

                time: certificate.issuedAt

            });

        });

        activities.sort(

            (a, b) => new Date(b.time) - new Date(a.time)

        );

        return res.json({

            success: true,

            activities: activities.slice(0, 10)

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

    getDashboard, getRecentActivity

};