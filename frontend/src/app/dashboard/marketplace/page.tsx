"use client";

import { useEffect, useState } from "react";
import { useProject } from "@/context/ProjectContext";
import Link from "next/link";

export default function MarketplacePage() {

  const { getAllProjects } = useProject();

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects = async () => {

    try {

      const res = await getAllProjects();

      setProjects(res.projects);

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

      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-lg font-medium text-gray-400">
          Loading Marketplace...
        </div>
      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div className="rounded-3xl border border-white/10 bg-[#111118] p-5 sm:p-6">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Marketplace
            </p>

            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Discover Projects
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              Browse community projects available for collaboration or ownership transfer.
            </p>

          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-4">

            <p className="text-xs uppercase tracking-wider text-violet-300">
              Available
            </p>

            <p className="mt-1 text-3xl font-bold text-white">
              {projects.length}
            </p>

          </div>

        </div>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
        {projects.length === 0 ? (

          <div className="col-span-full rounded-3xl border border-white/10 bg-[#111118] p-16 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Projects Found
            </h3>

            <p className="mt-3 text-gray-400">
              There are currently no projects available in the marketplace.
            </p>
          </div>

        ) : (

          projects.map((project: any) => (

            <div
              key={project._id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111118] transition-all duration-300 hover:-translate-y-2 hover:border-violet-500 hover:shadow-[0_0_35px_rgba(139,92,246,0.12)]"
            >
              <img
                src={project.image || "https://placehold.co/600x400"}
                alt={project.title}
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52" />

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center justify-between">

                  <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">

                    {project.category}

                  </span>

                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">

                    {project.difficulty}

                  </span>

                </div>

                <h2 className="mb-3 line-clamp-1 text-xl font-bold text-white">

                  {project.title}

                </h2>

                <p className="mb-5 line-clamp-3 text-sm leading-7 text-gray-400">

                  {project.description}

                </p>

                <div className="mb-5 flex flex-wrap gap-2">

                  {project.techStack.map((tech: string) => (

                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                    >

                      {tech}

                    </span>

                  ))}

                </div>

                <div className="mb-6 flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <div>

                    <p className="text-sm text-gray-500">

                      Owner

                    </p>

                    <Link
                      href={`/dashboard/developer/${project.owner._id}`}
                      className="inline-flex items-center gap-2 text-gray-300 transition hover:text-violet-400"
                    >

                      {project.owner.name}

                    </Link>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-500">

                      Price

                    </p>

                    <p className="text-lg font-bold text-violet-400">

                      {project.price === 0 ? "Free" : `₹${project.price}`}

                    </p>

                  </div>

                </div>

                <div className="mt-auto flex gap-3 pt-2">
                  <Link
                    href={`/dashboard/marketplace/${project._id}`}
                    className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-center font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]"                  >

                    View

                  </Link>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

} 