import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Project from "../models/Project.js";

// =====================================================
// Create Conversation
// =====================================================

const createConversation = async (req, res) => {

    try {

        const { projectId, receiverId } = req.body;

        const senderId = req.user.userId;

        const project = await Project.findById(projectId);

        if (!project) {

            return res.status(404).json({
                success: false,
                message: "Project not found"
            });

        }

        let conversation = await Conversation.findOne({

            project: projectId,

            members: {
                $all: [senderId, receiverId]
            }

        });

        if (conversation) {

            return res.status(200).json({

                success: true,

                conversation

            });

        }

        conversation = await Conversation.create({

            members: [senderId, receiverId],

            project: projectId

        });

        return res.status(201).json({

            success: true,

            conversation

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

// =====================================================
// Get My Conversations
// =====================================================

const getMyConversations = async (req, res) => {

    try {

        const userId = req.user.userId;

        const conversations = await Conversation.find({

            members: userId

        })
            .populate("members", "name email profileImage")
            .populate("project", "title")
            .sort({ lastMessageAt: -1 });

        const formatted = conversations.map((conversation) => {

            const otherUser = conversation.members.find(

                member => member._id.toString() !== userId

            );

            return {

                ...conversation.toObject(),

                otherUser

            };

        });

        return res.status(200).json({

            success: true,

            conversations: formatted

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

// =====================================================
// Send Message
// =====================================================

const sendMessage = async (req, res) => {

    try {

        const {

            conversationId,

            receiverId,

            text

        } = req.body;

        const senderId = req.user.userId;

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {

            return res.status(404).json({

                success: false,

                message: "Conversation not found"

            });

        }

        const message = await Message.create({

            conversation: conversationId,

            sender: senderId,

            receiver: receiverId,

            text

        });

        conversation.lastMessage = text;

        conversation.lastMessageAt = new Date();

        await conversation.save();

        return res.status(201).json({

            success: true,

            message

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

// =====================================================
// Get Messages
// =====================================================

const getMessages = async (req, res) => {

    try {

        const { conversationId } = req.params;

        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {

            return res.status(404).json({

                success: false,

                message: "Conversation not found"

            });

        }

        if (
            !conversation.members
                .map(member => member.toString())
                .includes(req.user.userId)
        ) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        const messages = await Message.find({

            conversation: conversationId

        })
            .populate("sender", "name email profileImage")
            .populate("receiver", "name email profileImage")
            .sort({

                createdAt: 1

            });

        return res.status(200).json({

            success: true,

            messages

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


// =====================================================
// Mark Messages as Seen
// =====================================================

const markMessagesSeen = async (req, res) => {

    try {

        const { conversationId } = req.params;

        await Message.updateMany(

            {

                conversation: conversationId,

                receiver: req.user.userId,

                seen: false

            },

            {

                seen: true

            }

        );

        return res.status(200).json({

            success: true,

            message: "Messages marked as seen"

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


// =====================================================
// Delete Message (Optional)
// =====================================================

const deleteMessage = async (req, res) => {

    try {

        const message = await Message.findById(req.params.id);

        if (!message) {

            return res.status(404).json({

                success: false,

                message: "Message not found"

            });

        }

        if (message.sender.toString() !== req.user.userId) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"

            });

        }

        await message.deleteOne();

        return res.status(200).json({

            success: true,

            message: "Message deleted"

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


// =====================================================
// EXPORTS
// =====================================================

export {

    createConversation,

    getMyConversations,

    sendMessage,

    getMessages,

    markMessagesSeen,

    deleteMessage

};