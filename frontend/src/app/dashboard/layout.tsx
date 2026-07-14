"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#09090F]">

        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
        <div className="flex flex-1 flex-col lg:ml-72">
          <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#09090F]/90 px-4 backdrop-blur lg:hidden">

            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 hover:bg-white/5"
            >
              <Menu size={24} className="text-white" />
            </button>

            <h2 className="font-bold text-white">
              Repo<span className="text-violet-500">Revive</span>
            </h2>

            <div className="w-8" />

          </div>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>

        </div>

      </div>
    </ProtectedRoute>
  );
}