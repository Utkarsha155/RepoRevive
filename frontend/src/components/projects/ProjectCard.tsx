"use client";

import Link from "next/link";
import { FolderGit2 } from "lucide-react";
import { useProject } from "@/context/ProjectContext";

export default function ProjectCard({
  project,
  onDelete,
}: {
  project: any;
  onDelete: () => void;
}) {
  const { deleteProject } = useProject();

  const handleDelete = async () => {
    if (!confirm("Delete this project?")) return;

    try {
      await deleteProject(project._id);
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20">
            <FolderGit2 className="text-violet-400" />
          </div>

          <div>

            <h3 className="text-lg font-semibold text-white line-clamp-1">
              {project.title}
            </h3>

            <p className="text-sm text-gray-400 line-clamp-2">
              {project.description}
            </p>

          </div>

        </div>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
          {project.status}
        </span>

      </div>

      <div className="mt-5 flex flex-wrap gap-2">

        {project.techStack?.map((tech: string) => (
          <span
            key={tech}
            className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300"
          >
            {tech}
          </span>
        ))}

      </div>

      <div className="mt-6 flex items-center justify-between text-sm">

        <span className="text-violet-400">
          {project.price === 0 ? "Free" : `₹${project.price}`}
        </span>

        <span className="text-gray-400">
          {project.views} Views
        </span>

      </div>

      <div className="mt-6 flex gap-3">

        <Link
          href={`/dashboard/projects/${project._id}`}
          className="flex-1 rounded-xl bg-violet-600 py-3 text-center text-white"
        >
          View
        </Link>

        <Link
          href={`/dashboard/projects/edit/${project._id}`}
          className="flex-1 rounded-xl border border-violet-600 py-3 text-center text-violet-400"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="rounded-xl bg-red-600 px-5 text-white"
        >
          Delete
        </button>

      </div>

    </div>
  );
}