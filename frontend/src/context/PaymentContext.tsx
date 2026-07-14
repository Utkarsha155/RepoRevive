"use client";

import { createContext, useContext } from "react";
import api from "@/services/api";

type PaymentContextType = {

    createOrder: (requestId: string) => Promise<any>;

    verifyPayment: (data: any) => Promise<any>;
    demoPayment: (requestId: string) => Promise<any>;
};

const PaymentContext = createContext<PaymentContextType | null>(null);

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {

    const createOrder = async (requestId: string) => {

        const res = await api.post("/payment/create-order", {

            requestId

        });

        return res.data;

    };

    const verifyPayment = async (data: any) => {

        const res = await api.post("/payment/verify", data);

        return res.data;

    };

    const demoPayment = async (requestId: string) => {

        const res = await api.post("/payment/demo-payment", {

            requestId

        });

        return res.data;

    };

    return (

        <PaymentContext.Provider value={{

            createOrder,

            verifyPayment,
            demoPayment

        }}>

            {children}

        </PaymentContext.Provider>

    );

};

export const usePayment = () => {

    const context = useContext(PaymentContext);

    if (!context) {

        throw new Error("usePayment must be used inside PaymentProvider");

    }

    return context;

};