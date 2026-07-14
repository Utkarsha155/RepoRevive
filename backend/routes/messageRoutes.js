import express from "express";
import authUser from "../middleware/authMiddleware.js";

import {

    createConversation,

    getMyConversations,

    sendMessage,

    getMessages,

    markMessagesSeen,

    deleteMessage

} from "../controllers/messageController.js";

const messageRouter = express.Router();

// =========================================
// Conversation
// =========================================

messageRouter.post(
    "/conversation",
    authUser,
    createConversation
);

messageRouter.get(
    "/conversation",
    authUser,
    getMyConversations
);

// =========================================
// Messages
// =========================================

messageRouter.post(
    "/send",
    authUser,
    sendMessage
);

messageRouter.get(
    "/:conversationId",
    authUser,
    getMessages
);

messageRouter.put(
    "/seen/:conversationId",
    authUser,
    markMessagesSeen
);

messageRouter.delete(
    "/:id",
    authUser,
    deleteMessage
);

export default messageRouter;