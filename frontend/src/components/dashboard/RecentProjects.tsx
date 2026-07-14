"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FolderGit2,
  ArrowRight,
  Code2,
  IndianRupee,
} from "lucide-react";

import { useProject } from "@/context/ProjectContext";

export default function RecentProjects() {
  const { getMyProjects } = useProject();

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await getMyProjects();

      setProjects(res.projects.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111118] p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Recent Projects
        </h2>

        <Link
          href="/dashboard/projects"
          className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="space-y-5">
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-white/10 p-8 text-center text-gray-400">
            No Projects Yet
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:border-violet-500"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">
                    <FolderGit2
                      size={24}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {project.category}
                    </p>
                  </div>
                </div>

                <span
                  className={`self-start rounded-full px-4 py-2 sm:self-auto text-sm font-medium ${project.adopted
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                    }`}
                >
                  {project.adopted ? "Adopted" : "Available"}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2">
                  <Code2
                    size={18}
                    className="text-violet-400"
                  />

                  <span className="text-sm text-gray-300">
                    {project.projectType}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2">
                  <IndianRupee
                    size={18}
                    className="text-violet-400"
                  />

                  <span className="text-sm text-gray-300">
                    {project.price}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}