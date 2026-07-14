"use client";

import Link from "next/link";
import { Calendar, IndianRupee, FolderGit2, User, Trash2, CreditCard } from "lucide-react";
import { useRequest } from "@/context/RequestContext";
import loadRazorpay from "@/utils/loadRazorpay";
import { usePayment } from "@/context/PaymentContext";
import { useState } from "react";
import PaymentSuccessModal from "@/components/payment/PaymentSuccessModal";
import api from "@/services/api";


export default function SentRequestCard({ request }: { request: any }) {

    const { cancelRequest } = useRequest();
    const [showSuccess, setShowSuccess] = useState(false);
    const [certificateId, setCertificateId] = useState("");
    const {
        createOrder,
        verifyPayment,
        demoPayment
    } = usePayment();
    const isDevelopment = process.env.NODE_ENV === "development";
    const handleCancel = async () => {

        if (!confirm("Cancel this request?")) return;

        try {

            await cancelRequest(request._id);

            window.location.reload();

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleDemoPayment = async () => {

        try {

            const res = await demoPayment(request._id);

            setCertificateId(res.certificateId);

            setShowSuccess(true);

        }

        catch (error) {

            console.log(error);

            alert("Payment Failed");

        }

    }

    const handlePayment = async () => {

        try {

            const loaded = await loadRazorpay();

            if (!loaded) {

                alert("Failed to load Razorpay");

                return;

            }

            const res = await createOrder(request._id);

            const order = res.order;

            const options = {

                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

                amount: order.amount,

                currency: order.currency,

                name: "RepoRevive",

                description: "Project Ownership Transfer",

                order_id: order.id,

                handler: async function (response: any) {

                    try {

                        const res = await verifyPayment({

                            razorpay_order_id: response.razorpay_order_id,

                            razorpay_payment_id: response.razorpay_payment_id,

                            razorpay_signature: response.razorpay_signature

                        });

                        setCertificateId(res.certificateId);

                        setShowSuccess(true);

                    }

                    catch (error) {

                        console.log(error);

                        alert("Payment verification failed");

                    }

                },

                prefill: {

                    name: "",

                    email: ""

                },

                theme: {

                    color: "#7c3aed"

                }

            };

            const paymentObject = new (window as any).Razorpay(options);

            paymentObject.open();

        }

        catch (error) {

            console.log(error);

        }

    };

    const downloadPdf = async (id: string) => {

        try {

            const response = await api.get(
                `/certificate/pdf/${id}`,
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "certificate.pdf";

            link.click();

        } catch (err) {

            console.log(err);

        }

    };

    return (
        <>
            <PaymentSuccessModal
                open={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    window.location.reload();
                }}
                certificateId={certificateId}
            />
            <div className="rounded-3xl border border-white/10 bg-[#111118] p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>

                        <h2 className="text-base sm:text-lg font-semibold text-white break-words">
                            {request.project?.title}

                        </h2>

                        <p className="mt-1 text-gray-400">

                            Sent to{" "}

                            <Link
                                href={`/dashboard/developer/${request.receiver?._id}`}
                                className="font-medium text-violet-400 hover:underline"
                            >

                                {request.receiver?.name}

                            </Link>

                        </p>

                    </div>

                    <span
                        className={`rounded-full self-start px-3 py-1 text-xs font-medium ${request.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : request.status === "Accepted"
                                ? "bg-green-500/20 text-green-400"
                                : request.status === "Awaiting Payment"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : request.status === "Completed"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"

                            }`}
                    >

                        {request.status}

                    </span>

                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-gray-300">

                        <FolderGit2 size={18} />

                        {request.type}

                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-gray-300">

                        <IndianRupee size={18} />

                        {request.offerPrice > 0 ? `₹${request.offerPrice}` : "No Offer"}

                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-gray-300">

                        <User size={18} />

                        {request.receiver?.email}

                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-gray-300">

                        <Calendar size={18} />

                        {new Date(request.createdAt).toLocaleDateString()}

                    </div>

                </div>

                <div className="mt-6 rounded-2xl border border-white/5 bg-[#181820] p-4">
                    <h3 className="mb-3 font-semibold text-white">

                        Message

                    </h3>

                    <p className="break-words text-sm leading-6 text-gray-300">
                        {request.message}

                    </p>

                </div>

                <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
                    <Link
                        href={`/dashboard/marketplace/${request.project?._id}`}
                        className="rounded-xl border border-violet-500 w-full sm:w-auto px-4 py-3 text-sm font-medium text-violet-400 hover:bg-violet-600 hover:text-white"
                    >

                        View Project

                    </Link>

                    {

                        request.status === "Pending" &&

                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 rounded-xl bg-red-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
                        >

                            <Trash2 size={18} />

                            Cancel Request

                        </button>

                    }

                    {
                        request.status === "Awaiting Payment" && (

                            <>

                                <button
                                    onClick={handlePayment}
                                    className="flex items-center gap-2 rounded-xl bg-green-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white hover:bg-green-500"
                                >

                                    <CreditCard size={18} />

                                    Pay Now

                                </button>

                                {isDevelopment && (

                                    <button
                                        onClick={handleDemoPayment}
                                        className="rounded-xl bg-blue-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white hover:bg-blue-500"
                                    >

                                        Demo Payment

                                    </button>

                                )}

                            </>

                        )
                    }
                    {request.status === "Completed" && request.certificate && (
                        <>
                            <Link
                                href={`/dashboard/certificates/${request.certificate?._id}`} className="rounded-xl bg-violet-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white"
                            >
                                View Certificate
                            </Link>

                            <button
                                onClick={() => downloadPdf(request.certificate._id)}
                                className="rounded-xl bg-green-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white"
                            >
                                Download PDF
                            </button>
                        </>

                    )}
                </div>

            </div>
        </>
    );

}