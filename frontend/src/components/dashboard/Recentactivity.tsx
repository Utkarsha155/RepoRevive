"use client";

import {
    CheckCircle2,
    MessageCircle,
    Award,
    IndianRupee,
    Clock
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";

const iconMap = {

    request: CheckCircle2,

    message: MessageCircle,

    payment: IndianRupee,

    certificate: Award

};

const colorMap = {

    request: "text-green-400",

    message: "text-violet-400",

    payment: "text-yellow-400",

    certificate: "text-blue-400"

};

export default function RecentActivity() {
    const [activities, setActivities] = useState<any[]>([]);
    const { getRecentActivity } = useDashboard();
    useEffect(() => {

        loadActivities();

    }, []);

    const loadActivities = async () => {

        try {

            const res = await getRecentActivity();

            setActivities(res.activities);

        }

        catch (err) {

            console.log(err);

        }

    };
    return (

        <div className="rounded-3xl border border-white/10 bg-[#111118] p-5 sm:p-7">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-white">

                    Recent Activity

                </h2>

                <Clock
                    size={20}
                    className="text-violet-400"
                />

            </div>

            <div className="space-y-5">

                {

                    activities.map((activity, index) => {

                        const Icon =
                            iconMap[
                            activity.type as keyof typeof iconMap
                            ];
                        return (

                            <div
                                key={index}
                                className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-violet-500 sm:flex-row sm:items-start">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">

                                    <Icon
                                        size={22}
                                        className={
                                            colorMap[
                                            activity.type as keyof typeof colorMap
                                            ]
                                        } />

                                </div>

                                <div className="flex-1">

                                    <h3 className="font-semibold text-white">

                                        {activity.title}

                                    </h3>

                                    <p className="mt-1 text-sm text-gray-400">

                                        {activity.description}

                                    </p>

                                </div>

                                <span className="whitespace-nowrap text-xs text-gray-500 sm:ml-auto">
                                    {new Date(activity.time).toLocaleDateString()}

                                </span>

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}