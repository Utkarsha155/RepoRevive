"use client";

import { createContext, useContext } from "react";
import api from "@/services/api";

type CertificateContextType = {
    getCertificate: (id: string) => Promise<any>;
    getMyCertificates: () => Promise<any>;
};

const CertificateContext = createContext<CertificateContextType | null>(null);

export const CertificateProvider = ({ children }: { children: React.ReactNode }) => {

    const getCertificate = async (id: string) => {

        const res = await api.get(`/certificate/${id}`);

        return res.data;

    };

    const getMyCertificates = async () => {

        const res = await api.get("/certificate/my");

        return res.data;

    };

    return (

        <CertificateContext.Provider
            value={{
                getCertificate,
                getMyCertificates
            }}
        >

            {children}

        </CertificateContext.Provider>

    );

};

export const useCertificate = () => {

    const context = useContext(CertificateContext);

    if (!context) {

        throw new Error("useCertificate must be used inside CertificateProvider");

    }

    return context;

};