"use client";

import Link from "next/link";
import { ArrowRight, FolderPlus, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHero() {
  const { user } = useAuth();

  return (

    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-6 sm:p-8 lg:p-10">
      <>
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 left-20 h-60 w-60 rounded-full bg-violet-400/10 blur-3xl" />
      </>
      <div className="relative z-10 max-w-3xl">

        <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-200">

          RepoRevive Dashboard

        </p>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Welcome Back, {user?.name || "User"} 👋
        </h1>

        <p className="mt-5 text-base leading-7 text-violet-100 sm:text-lg sm:leading-8">
          Manage your repositories, ownership transfers,
          marketplace requests, certificates and conversations
          from one place.

        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/dashboard/upload"
            className="flex sm:w-auto items-center justify-cente gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:scale-105"
          >

            <FolderPlus size={20} />

            Upload Project

          </Link>

          <Link
            href="/dashboard/marketplace"
            className="flex sm:w-auto items-center justify-cente gap-2 rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >

            <Store size={20} />

            Marketplace

            <ArrowRight size={18} />

          </Link>

        </div>

      </div>

    </section>

  );

}