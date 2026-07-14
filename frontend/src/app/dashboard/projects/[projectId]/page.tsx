"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Globe, User, Eye, Calendar, Pencil } from "lucide-react";
import { useProject } from "@/context/ProjectContext";
import { FaGithub } from "react-icons/fa";

export default function ProjectDetailsPage() {

  const { projectId } = useParams();

  const { getProject } = useProject();

  const [project, setProject] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProject();

  }, []);

  const loadProject = async () => {
    console.log(projectId);
    try {

      const res = await getProject(projectId as string);
      setProject(res.project);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center text-white">

        Loading...

      </div>

    );

  }

  if (!project) {

    return (

      <div className="flex h-[70vh] items-center justify-center text-red-500">

        Project Not Found

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-7xl space-y-5">
      {/* Banner */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111118]">

        <img
          src={project.image || "https://placehold.co/1400x500"}
          alt={project.title}
          className="h-44 w-full object-cover sm:h-56 lg:h-72"
        />

        <div className="p-5 sm:p-6">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex-1">

              <h1 className="text-2xl font-bold text-white sm:text-3xl">

                {project.title}

              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">

                {project.description}

              </p>

            </div>

            <Link
              href={`/dashboard/projects/edit/${project._id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >

              <Pencil size={17} />

              Edit Project

            </Link>

          </div>

        </div>

      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left */}

        <div className="space-y-5 lg:col-span-2">
          {/* About */}

          <div className="rounded-2xl p-5 sm:p-6 border border-white/10 bg-[#111118] p-8">

            <h2 className="mb-5 text-xl sm:text-2xl font-semibold text-white">

              About Project

            </h2>

            <p className="text-sm leading-7 text-gray-300">

              {project.description}

            </p>

          </div>

          {/* Tech Stack */}

          <div className="rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6">

            <h2 className="mb-5 text-xl font-semibold text-white">

              Tech Stack

            </h2>

            <div className="flex flex-wrap gap-2">

              {project.techStack?.map((tech: string) => (

                <span
                  key={tech}
                  className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"
                >

                  {tech}

                </span>

              ))}

            </div>

          </div>

          {/* Tags */}

          <div className="rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6">

            <h2 className="mb-5 text-xl font-semibold text-white">

              Tags

            </h2>

            <div className="flex flex-wrap gap-2">

              {project.tags?.map((tag: string) => (

                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                >

                  {tag}

                </span>

              ))}

            </div>

          </div>

          {/* README */}

          <div className="rounded-2xl p-5 sm:p-6 border border-white/10 bg-[#111118] p-8">

            <h2 className="mb-5 text-xl font-semibold text-white">

              README

            </h2>

            <p className="whitespace-pre-wrap text-sm leading-7 text-gray-300">

              {project.readme || "No README Available"}

            </p>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-5">

          <div className="rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6">

            <h2 className="mb-5 text-xl font-semibold text-white">

              Project Details

            </h2>

            <div className="space-y-1 text-sm">

              <div className="flex items-center justify-between border-b border-white/5 py-3">

                <span className="text-gray-400">Category</span>

                <span className="font-medium text-white">

                  {project.category}

                </span>

              </div>

              <div className="flex items-center justify-between border-b border-white/5 py-3">

                <span className="text-gray-400">Project Type</span>

                <span className="font-medium text-white">

                  {project.projectType}

                </span>

              </div>

              <div className="flex items-center justify-between border-b border-white/5 py-3">

                <span className="text-gray-400">Difficulty</span>

                <span className="font-medium text-white">

                  {project.difficulty}

                </span>

              </div>

              <div className="flex items-center justify-between border-b border-white/5 py-3">

                <span className="text-gray-400">Looking For</span>

                <span className="font-medium text-white">

                  {project.lookingFor}

                </span>

              </div>

              <div className="flex items-center justify-between border-b border-white/5 py-3">

                <span className="text-gray-400">Compensation</span>

                <span className="font-medium text-white">

                  {project.compensationType}

                </span>

              </div>

              <div className="flex items-center justify-between border-b border-white/5 py-3">

                <span className="text-gray-400">Negotiable</span>

                <span className="font-medium text-white">

                  {project.negotiable ? "Yes" : "No"}

                </span>

              </div>

              <div className="flex items-center justify-between pt-3">

                <span className="text-gray-400">

                  Price

                </span>

                <span className="font-semibold text-violet-400">

                  {project.price === 0 ? "Free" : `₹${project.price}`}

                </span>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6">

            <h2 className="mb-5 text-xl font-semibold text-white">

              Statistics

            </h2>

            <div className="space-y-3">

              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">

                <Eye
                  size={18}
                  className="text-violet-400"
                />

                <div>

                  <p className="text-sm text-white">

                    {project.views}

                  </p>

                  <p className="text-xs text-gray-400">

                    Views

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">

                <Calendar
                  size={18}
                  className="text-violet-400"
                />

                <div>

                  <p className="text-sm text-white">

                    {new Date(project.createdAt).toLocaleDateString()}

                  </p>

                  <p className="text-xs text-gray-400">

                    Created

                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6">

            <h2 className="mb-5 text-xl font-semibold text-white">

              Owner

            </h2>

            <div className="mb-5 flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-lg font-bold text-white">

                {project.owner?.name?.charAt(0).toUpperCase()}

              </div>

              <div>

                <h3 className="font-semibold text-white">

                  {project.owner?.name}

                </h3>

                <p className="text-sm text-gray-400">

                  {project.owner?.email}

                </p>

              </div>

            </div>

            <div className="space-y-3">

              {project.githubLink && (

                <a
                  href={project.githubLink}
                  target="_blank"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-violet-500 hover:bg-white/10"
                >

                  <FaGithub size={18} />

                  GitHub Repository

                </a>

              )}

              {project.liveLink && (

                <a
                  href={project.liveLink}
                  target="_blank"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-violet-500 hover:bg-white/10"
                >

                  <Globe size={18} />

                  Live Demo

                </a>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}