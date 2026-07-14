"use client";

import { useEffect, useState } from "react";
import { useRequest } from "@/context/RequestContext";
import SentRequestCard from "@/components/dashboard/SentRequestcard";

export default function SentRequestsPage() {

    const { getSentRequests } = useRequest();

    const [requests, setRequests] = useState<any[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadRequests();

    }, []);

    const loadRequests = async () => {

        try {

            const res = await getSentRequests();

            setRequests(res.requests);

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

        <div>

            <div className="mb-6">

                <h1 className="text-3xl font-bold text-white">

                    Sent Requests

                </h1>

                <p className="mt-2 text-sm text-gray-400">

                    Track every ownership and collaboration request you've sent.

                </p>

            </div>

            {

                requests.length === 0 ?

                    (

                        <div className="rounded-2xl border border-dashed border-white/10 bg-[#111118] px-6 py-16 text-center">

                            <h2 className="text-2xl font-semibold text-white">

                                No Requests Sent

                            </h2>

                            <p className="mt-3 text-gray-400">

                                Your sent requests will appear here.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="space-y-4">

                            {

                                requests.map((request: any) => (

                                    <SentRequestCard

                                        key={request._id}

                                        request={request}

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}