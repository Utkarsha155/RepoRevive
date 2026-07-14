"use client";

import Link from "next/link";
import {
    Upload,
    Store,
    MessageCircle,
    Award,
    ArrowRight
} from "lucide-react";

export default function QuickActions({
    stats
}: {
    stats: any;
}) {
    const actions = [

        {
            title: "Upload Project",
            description: "Share your abandoned project with the community.",
            icon: Upload,
            href: "/dashboard/upload",
            color: "bg-violet-600",
            badge: stats.totalProjects
        },

        {
            title: "Marketplace",
            description: "Explore projects available for adoption.",
            icon: Store,
            href: "/dashboard/marketplace",
            color: "bg-blue-600",
            badge: stats.totalMarketplaceProjects
        },

        {
            title: "Messages",
            description: "Chat with buyers and sellers instantly.",
            icon: MessageCircle,
            href: "/dashboard/messages",
            color: "bg-green-600",
            badge: stats.totalConversations
        },

        {
            title: "Certificates",
            description: "View ownership transfer certificates.",
            icon: Award,
            href: "/dashboard/certificates",
            color: "bg-yellow-500",
            badge: stats.totalCertificates
        }

    ];

    return (

        <div className="rounded-3xl border border-white/10 bg-[#111118] p-5 sm:p-7">

            <h2 className="mb-6 text-2xl font-bold text-white">

                Quick Actions

            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

                {

                    actions.map((action) => {

                        const Icon = action.icon;

                        return (

                            <Link
                                key={action.title}
                                href={action.href}
                                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-6 transition hover:-translate-y-1 hover:border-violet-500"
                            >

                                <div className="relative w-fit">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${action.color}`}
                                    >
                                        <Icon className="text-white" size={26} />
                                    </div>

                                    {typeof action.badge === "number" && (
                                        <span className="absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-violet-600 px-2 text-xs font-bold text-white shadow-lg">
                                            {action.badge}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-5 flex items-center justify-between">

                                    <h3 className="text-lg sm:text-xl font-semibold text-white">

                                        {action.title}

                                    </h3>


                                </div>

                                <p className="mt-2 text-sm leading-6 text-gray-400">

                                    {action.description}

                                </p>

                                <div className="mt-6 flex items-center gap-2 text-violet-400">

                                    <span className="text-sm font-medium">

                                        Open

                                    </span>

                                    <ArrowRight
                                        size={18}
                                        className="transition group-hover:translate-x-1"
                                    />

                                </div>

                            </Link>

                        );

                    })

                }

            </div>

        </div>

    );

}