"use client";

import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "@/components/dashboard/Recentactivity";
import RecentProjects from "@/components/dashboard/RecentProjects";
import QuickActions from "@/components/dashboard/QuickActions";
import { useEffect, useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { motion } from "framer-motion";


export default function DashboardPage() {
    const [dashboard, setDashboard] = useState<any>(null);
    const { getDashboard } = useDashboard();

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        const res = await getDashboard();

        setDashboard(res);

    };
    if (!dashboard) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <div className="text-lg font-medium text-gray-400">
                    Loading Dashboard...
                </div>
            </div>
        );
    }

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 lg:space-y-8"
        >            {/* Hero */}

            <DashboardHero />

            {/* Stats */}

            <DashboardStats
                stats={dashboard.stats}
            />

            {/* Activity + Quick Actions */}

            <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
                <RecentActivity />

                <QuickActions
                    stats={dashboard.stats}
                />

            </div>

            {/* Recent Projects */}

            <RecentProjects />

        </motion.div>
    );

}