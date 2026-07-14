"use client";

import {
    createContext,
    useContext
} from "react";

import api from "@/services/api";

const DeveloperContext = createContext<any>(null);

export function DeveloperProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const getDeveloperProfile = async (
        id: string
    ) => {

        const res = await api.get(
            `/user/${id}`
        );

        return res.data;

    };

    return (

        <DeveloperContext.Provider
            value={{
                getDeveloperProfile
            }}
        >

            {children}

        </DeveloperContext.Provider>

    );

}

export function useDeveloper() {

    return useContext(
        DeveloperContext
    );

}