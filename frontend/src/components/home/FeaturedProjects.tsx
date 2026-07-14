"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const projects = [
  {
    title: "AI Resume Builder",
    description:
      "An AI-powered resume builder abandoned at 80% completion. Looking for a developer to finish authentication and deployment.",
    tech: ["Next.js", "TypeScript", "OpenAI"],
    completion: 80,
  },
  {
    title: "Crypto Portfolio Tracker",
    description:
      "Modern dashboard for tracking crypto assets with live market integration and analytics.",
    tech: ["React", "Node.js", "MongoDB"],
    completion: 65,
  },
  {
    title: "Food Delivery Platform",
    description:
      "A Swiggy/Zomato style project with customer, restaurant and delivery modules already implemented.",
    tech: ["Next.js", "Express", "PostgreSQL"],
    completion: 92,
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="mb-4 text-violet-400 font-semibold uppercase tracking-[4px]">
            Marketplace
          </p>

          <h2 className="text-5xl font-bold text-white">
            Featured Projects
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Explore abandoned projects and find the perfect
            opportunity to collaborate or take ownership.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {projects.map((project, index) => (

            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition duration-300 hover:border-violet-500/40 hover:-translate-y-2"
            >

              {/* Thumbnail */}

              <div className="mb-6 flex h-44 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-700/40 to-cyan-500/20">

                <Star
                  className="text-violet-300"
                  size={55}
                />

              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-white">
                {project.title}
              </h3>

              <p className="mt-4 text-gray-400 leading-7">
                {project.description}
              </p>

              {/* Tech */}

              <div className="mt-6 flex flex-wrap gap-3">

                {project.tech.map((tech) => (

                  <span
                    key={tech}
                    className="rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
                  >
                    {tech}
                  </span>

                ))}

              </div>

              {/* Stats */}

              <div className="mt-8 flex justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Completion
                  </p>

                  <p className="text-xl font-bold text-cyan-400">
                    {project.completion}%
                  </p>

                </div>

              </div>

              <Link
                href="/marketplace"
                className="mt-8 flex items-center gap-2 text-violet-400 font-semibold"
              >
                View Details

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </Link>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}