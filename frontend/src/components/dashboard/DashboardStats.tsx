"use client";

import {
    FolderGit2,
    FileText,
    MessageCircle,
    Award,
    ArrowUpRight
} from "lucide-react";

const iconMap = {
    projects: FolderGit2,
    requests: FileText,
    messages: MessageCircle,
    certificates: Award
};

export default function DashboardStats({
    stats
}: {
    stats: any;
}) {

    const cards = [

        {
            title: "My Projects",
            value: stats.totalProjects,
            subtitle: "Projects Uploaded",
            color: "bg-violet-600",
            icon: iconMap.projects
        },

        {
            title: "Requests",
            value: stats.totalReceivedRequests,
            subtitle: "Pending & Completed",
            color: "bg-blue-600",
            icon: iconMap.requests
        },

        {
            title: "Messages",
            value: stats.totalConversations,
            subtitle: "Active Conversations",
            color: "bg-green-600",
            icon: iconMap.messages
        },

        {
            title: "Certificates",
            value: stats.totalCertificates,
            subtitle: "Ownership Transfers",
            color: "bg-yellow-500",
            icon: iconMap.certificates
        }

    ];

    return (

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {

                cards.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="group rounded-3xl border border-white/10 bg-[#111118] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.12)]"
                        >

                            <div className="flex justify-between">

                                <div>

                                    <p className="text-sm text-gray-400">

                                        {item.title}

                                    </p>

                                    <h2 className="mt-3 text-3xl lg:text-4xl  font-bold text-white">

                                        {item.value}

                                    </h2>

                                    <p className="mt-3 text-sm text-gray-500">

                                        {item.subtitle}

                                    </p>

                                </div>

                                <div className={`flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl ${item.color}`}>

                                    <Icon size={28} className="text-white" />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}