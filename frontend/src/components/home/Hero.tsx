"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        {/* Grid */}

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* Purple Glow */}

        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[140px]" />

      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="m-8 rounded-full border border-violet-500/30 bg-violet-500/10 px-6 py-2"
        >
          <span className="text-sm font-medium tracking-widest text-violet-300">
            ✦ The Marketplace for Abandoned Software Projects
          </span>
        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="max-w-5xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl"
        >
          Dead Projects

          <br />

          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Deserve A Second Life.
          </span>
        </motion.h1>

        {/* Subtitle */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .4 }}
          className="mt-8 max-w-3xl text-lg leading-9 text-gray-400 md:text-xl"
        >
          RepoRevive helps developers, startups and hackathon teams
          discover, collaborate on and adopt abandoned software projects
          through secure communication, ownership transfer and developer
          networking.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .6 }}
          className="mt-12 flex flex-col gap-5 sm:flex-row"
        >

          <Link
            href="/login"
            className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,.35)] transition hover:scale-105"
          >

            Get Started

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />

          </Link>

          <Link
            href="/marketplace"
            className="rounded-xl border border-violet-500/30 bg-white/5 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition hover:bg-violet-500/10"
          >
            Browse Projects
          </Link>

        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
          className="mt-24 grid w-full max-w-5xl gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:grid-cols-4"
        >

          <div>

            <h2 className="text-4xl font-bold text-violet-400">
              5K+
            </h2>

            <p className="mt-2 text-gray-400">
              Projects Listed
            </p>

          </div>

          <div>

            <h2 className="text-4xl font-bold text-cyan-400">
              2.1K
            </h2>

            <p className="mt-2 text-gray-400">
              Successfully Revived
            </p>

          </div>

          <div>

            <h2 className="text-4xl font-bold text-green-400">
              98%
            </h2>

            <p className="mt-2 text-gray-400">
              Secure Transfers
            </p>

          </div>

          <div>

            <h2 className="text-4xl font-bold text-pink-400">
              15K+
            </h2>

            <p className="mt-2 text-gray-400">
              Developers
            </p>

          </div>

        </motion.div>

      </div>

    </section>
  );
}