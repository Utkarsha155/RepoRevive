"use client";

import { useEffect, useState } from "react";
import { useRequest } from "@/context/RequestContext";
import RequestCard from "@/components/dashboard/RequestCard";
import SentRequestCard from "@/components/dashboard/SentRequestcard";

export default function RequestsPage() {

    const {
        getReceivedRequests,
        getSentRequests
    } = useRequest();

    const [activeTab, setActiveTab] = useState<"incoming" | "sent">("incoming");

    const [receivedRequests, setReceivedRequests] = useState<any[]>([]);

    const [sentRequests, setSentRequests] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadRequests();

    }, []);

    const loadRequests = async () => {

        try {

            const [received, sent] = await Promise.all([
                getReceivedRequests(),
                getSentRequests()
            ]);

            setReceivedRequests(received.requests);

            setSentRequests(sent.requests);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex h-[60vh] items-center justify-center">

                <div className="rounded-xl border border-white/10 bg-[#111118] px-8 py-4 text-gray-300">

                    Loading Requests...

                </div>

            </div>

        );

    }

    return (

        <div className="mx-auto max-w-7xl">
            <div className="mb-6">

                <h1 className="text-3xl font-bold text-white">

                    Requests

                </h1>

                <p className="mt-2 text-sm text-gray-400">

                    Manage ownership and collaboration requests from one place.

                </p>

            </div>

            <div className="mb-6 rounded-2xl border border-white/10 bg-[#111118] p-1">
                <div className="grid grid-cols-2 gap-1">

                    <button
                        onClick={() => setActiveTab("incoming")}
                        className={`rounded-xl px-3 py-3 text-sm font-semibold transition
    ${activeTab === "incoming"
                                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                                : "text-gray-400 hover:bg-white/5"
                            }`}
                    >

                        Incoming
                        <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">

                            {receivedRequests.length}

                        </span>

                    </button>

                    <button
                        onClick={() => setActiveTab("sent")}
                        className={`rounded-xl px-3 py-3 text-sm font-semibold transition
    ${activeTab === "sent"
                                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                                : "text-gray-400 hover:bg-white/5"
                            }`}
                    >

                        Sent
                        <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">

                            {sentRequests.length}

                        </span>

                    </button>

                </div>
            </div>

            {

                activeTab === "incoming" &&

                (

                    receivedRequests.length === 0 ?

                        (

                            <div className="rounded-2xl border border-dashed border-white/10 bg-[#111118] px-6 py-16 text-center">
                                <h2 className="text-xl sm:text-2xl font-semibold text-white">

                                    No Incoming Requests

                                </h2>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">

                                    When someone requests collaboration or ownership, it will appear here.

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="space-y-4">

                                {

                                    receivedRequests.map((request: any) => (

                                        <RequestCard

                                            key={request._id}

                                            request={request}
                                            loadRequests={loadRequests}

                                        />

                                    ))

                                }

                            </div>

                        )

                )

            }

            {

                activeTab === "sent" &&

                (

                    sentRequests.length === 0 ?

                        (

                            <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center">

                                <h2 className="text-2xl font-semibold text-white">

                                    No Sent Requests

                                </h2>

                                <p className="mt-3 text-gray-400">

                                    Requests you send to project owners will appear here.

                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="space-y-5">

                                {

                                    sentRequests.map((request: any) => (

                                        <SentRequestCard

                                            key={request._id}

                                            request={request}

                                        />

                                    ))

                                }

                            </div>

                        )

                )

            }

        </div>

    );

}
