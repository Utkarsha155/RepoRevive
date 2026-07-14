"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28">

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/20 blur-[150px]" />

      </div>

      <div className="relative mx-auto max-w-5xl px-6">

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-violet-500/20 bg-gradient-to-br from-white/5 to-violet-500/10 p-14 text-center backdrop-blur-xl"
        >

          <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-violet-400">
            Ready to Start?
          </p>

          <h2 className="text-5xl font-bold text-white">
            Give Dead Projects
            <br />
            A Second Life.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Join RepoRevive today to discover abandoned repositories,
            collaborate with talented developers and transform unfinished
            ideas into successful products.
          </p>

          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

            <Link
              href="/signup"
              className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_0_35px_rgba(124,58,237,.35)] transition hover:scale-105"
            >
              Get Started

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            </Link>

            <Link
              href="/marketplace"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium text-white transition hover:bg-white/10"
            >
              Explore Marketplace
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}