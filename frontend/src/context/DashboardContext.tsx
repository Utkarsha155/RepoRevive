"use client";

import {
    createContext,
    useContext
} from "react";

import api from "@/services/api";

type DashboardContextType = {

    getDashboard: () => Promise<any>;
    getRecentActivity: () => Promise<any>;
};

const DashboardContext =
    createContext<DashboardContextType | null>(null);

export const DashboardProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {

    const getDashboard = async () => {

        const res = await api.get(
            "/dashboard"
        );

        return res.data;

    };
    const getRecentActivity = async () => {

        const res = await api.get("/dashboard/recent-activity");

        return res.data;

    };
    return (

        <DashboardContext.Provider
            value={{
                getDashboard, getRecentActivity
            }}
        >

            {children}

        </DashboardContext.Provider>

    );

};

export const useDashboard = () => {

    const context = useContext(
        DashboardContext
    );

    if (!context) {

        throw new Error(
            "useDashboard must be used inside DashboardProvider"
        );

    }

    return context;

};