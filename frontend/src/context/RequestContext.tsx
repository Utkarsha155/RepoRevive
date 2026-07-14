"use client";

import { createContext, useContext } from "react";
import api from "@/services/api";

type RequestContextType = {
    createRequest: (data: any) => Promise<any>;
    getReceivedRequests: () => Promise<any>;
    getSentRequests: () => Promise<any>;
    acceptRequest: (id: string) => Promise<any>;
    rejectRequest: (id: string) => Promise<any>;
    cancelRequest: (id: string) => Promise<any>;
    deleteRequest: (id: string) => Promise<any>;
};

const RequestContext = createContext<RequestContextType | null>(null);

export const RequestProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    const createRequest = async (data: any) => {

        const res = await api.post("/request/create", data);

        return res.data;

    };

    const getReceivedRequests = async () => {

        const res = await api.get("/request/received");

        return res.data;

    };

    const getSentRequests = async () => {

        const res = await api.get("/request/sent");

        return res.data;

    };

    const acceptRequest = async (id: string) => {
        const res = await api.put(`/request/accept/${id}`);
        return res.data;
    };

    const rejectRequest = async (id: string) => {
        const res = await api.put(`/request/reject/${id}`);
        return res.data;
    };

    const cancelRequest = async (id: string) => {
        const res = await api.put(`/request/cancel/${id}`);
        return res.data;
    };

    const deleteRequest = async (id: string) => {

        const res = await api.delete(`/request/${id}`);

        return res.data;

    };

    return (

        <RequestContext.Provider
            value={{
                createRequest,
                getReceivedRequests,
                getSentRequests,
                acceptRequest,
                rejectRequest,
                cancelRequest,
                deleteRequest,
            }}
        >

            {children}

        </RequestContext.Provider>

    );

};

export const useRequest = () => {

    const context = useContext(RequestContext);

    if (!context) {

        throw new Error(
            "useRequest must be used inside RequestProvider"
        );

    }

    return context;

};