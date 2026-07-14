"use client";

import {
    createContext,
    useContext
} from "react";

import api from "@/services/api";

type MessageContextType = {

    getConversations: () => Promise<any>;

    getMessages: (conversationId: string) => Promise<any>;

    sendMessage: (data: {
        conversationId: string;
        receiverId: string;
        text: string;
    }) => Promise<any>;

};

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const getConversations = async () => {

        const res = await api.get("/message/conversation");

        return res.data;

    };

    const getMessages = async (
        conversationId: string
    ) => {

        const res = await api.get(
            `/message/${conversationId}`
        );

        return res.data;

    };

    const sendMessage = async (data: {
        conversationId: string;
        receiverId: string;
        text: string;
    }) => {

        const res = await api.post(
            "/message/send",
            data
        );

        return res.data;

    };

    return (

        <MessageContext.Provider
            value={{
                getConversations,
                getMessages,
                sendMessage
            }}
        >

            {children}

        </MessageContext.Provider>

    );

};

export const useMessage = () => {

    const context = useContext(MessageContext);

    if (!context) {

        throw new Error(
            "useMessage must be used inside MessageProvider"
        );

    }

    return context;

};