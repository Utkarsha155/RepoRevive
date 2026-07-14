"use client";

import { useState } from "react";
import { useRequest } from "@/context/RequestContext";

type Props = {
    open: boolean;
    onClose: () => void;
    projectId: string;
    type: "Ownership" | "Collaboration";
};

export default function RequestModal({
    open,
    onClose,
    projectId,
    type
}: Props) {

    const { createRequest } = useRequest();

    const [message, setMessage] = useState("");

    const [offerPrice, setOfferPrice] = useState(0);

    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {

        try {

            setLoading(true);

            const res = await createRequest({
                projectId,
                type,
                message,
                offerPrice
            });

            if (res.success) {

                alert("Request sent successfully.");

                setMessage("");

                setOfferPrice(0);

                onClose();

            }

        }

        catch (error: any) {

            alert(error.response?.data?.message || "Failed to send request");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#111118] p-5 shadow-2xl sm:p-6 lg:p-7">
                <h2 className="mb-5 text-xl font-bold text-white sm:text-2xl">
                    {type === "Ownership"
                        ? "Request Ownership"
                        : "Request Collaboration"}

                </h2>

                {type === "Ownership" && (

                    <div className="mb-6">

                        <label className="mb-2 block text-sm font-medium text-gray-300">
                            Offer Price

                        </label>

                        <input
                            type="number"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(Number(e.target.value))}
                            placeholder="Enter your offer price"
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                    </div>

                )}

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Message

                    </label>

                    <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full resize-none rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" placeholder="Tell the owner why you're interested..."
                    />

                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        onClick={onClose}
                        className="w-full rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5 sm:w-auto"                    >

                        Cancel

                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,.35)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"                    >

                        {loading ? "Sending..." : "Send Request"}

                    </button>

                </div>

            </div>

        </div>

    );

}