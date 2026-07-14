"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Globe, Eye, Calendar } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useProject } from "@/context/ProjectContext";
import RequestModal from "@/components/requests/RequestModal";
import Link from "next/link";

export default function MarketplaceProjectDetails() {

    const { id } = useParams();

    const { getProject } = useProject();

    const [project, setProject] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [type, setType] = useState<"Ownership" | "Collaboration">("Ownership");

    useEffect(() => {

        loadProject();

    }, []);

    const loadProject = async () => {

        try {

            const res = await getProject(id as string);

            setProject(res.project);

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
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111118]">
                <img
                    src={project.image || "https://placehold.co/1400x500"}
                    className="h-48 w-full object-cover sm:h-60 lg:h-72"
                    alt={project.title}
                />

                <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div>

                            <h1 className="text-2xl font-bold text-white sm:text-3xl">

                                {project.title}

                            </h1>


                        </div>

                        <div className="text-right">

                            <p className="text-gray-400">

                                Price

                            </p>

                            <p className="text-2xl font-bold text-violet-400">

                                {project.price === 0 ? "Free" : `₹${project.price}`}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid gap-5 lg:grid-cols-3">
                <div className="space-y-5 lg:col-span-2">
                    <div className="rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6">

                        <h2 className="mb-5 text-xl font-bold text-white">

                            About Project

                        </h2>

                        <p className="text-sm leading-7 sm:text-base text-gray-300">

                            {project.description}

                        </p>

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6">

                        <h2 className="mb-5 text-xl font-bold text-white">
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

                    <div className="rounded-2xl border border-white/10 bg-[#111118] p-8">

                        <h2 className="mb-5 text-xl font-bold text-white">

                            README

                        </h2>

                        <p className="whitespace-pre-wrap text-sm leading-7 text-gray-300">

                            {project.readme || "No README Available"}

                        </p>

                    </div>
                </div>

                <div className="space-y-6">

                    <div className="rounded-2xl border border-white/10 bg-[#111118] p-8">

                        <h2 className="mb-6 text-xl font-bold text-white">

                            Project Details

                        </h2>

                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex justify-between border-b border-white/5 pb-2">

                                <span className="text-gray-400">
                                    Category
                                </span>

                                <span className="font-medium text-white">
                                    {project.category}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-white/5 py-3">

                                <span className="text-gray-400">
                                    Difficulty
                                </span>

                                <span className="font-medium text-white">
                                    {project.difficulty}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-white/5 py-3">

                                <span className="text-gray-400">
                                    Project Type
                                </span>

                                <span className="font-medium text-white">
                                    {project.projectType}
                                </span>

                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 py-3">

                                <span className="text-gray-400">
                                    Looking For
                                </span>

                                <span className="font-medium text-white">
                                    {project.lookingFor}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-white/5 py-3">

                                <span className="text-gray-400">
                                    Compensation
                                </span>

                                <span className="font-medium text-white">
                                    {project.compensationType}
                                </span>

                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 py-3">

                                <span className="text-gray-400">
                                    Negotiable
                                </span>

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

                    <div className="rounded-2xl border border-white/10 bg-[#111118] p-8">

                        <h2 className="mb-6 text-xl font-bold text-white">

                            Statistics

                        </h2>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-sm text-gray-300">

                                <Eye />

                                {project.views} Views

                            </div>

                            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-sm text-gray-300">

                                <Calendar />

                                {new Date(project.createdAt).toLocaleDateString()}

                            </div>

                        </div>

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#111118] p-6 sm:p-8">

                        <h2 className="mb-6 text-xl font-bold text-white">

                            Owner

                        </h2>

                        <Link
                            href={`/dashboard/developer/${project.owner?._id}`}
                            className="group mb-6 flex items-center gap-4 rounded-xl p-2 -m-2 transition hover:bg-white/5"
                        >

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-xl font-bold text-white transition duration-300 group-hover:scale-105">

                                {project.owner?.name?.charAt(0).toUpperCase()}

                            </div>

                            <div className="min-w-0 flex-1">

                                <h3 className="truncate text-lg font-semibold text-white transition group-hover:text-violet-400">

                                    {project.owner?.name}

                                </h3>

                                <p className="truncate text-sm text-gray-400">

                                    {project.owner?.email}

                                </p>

                                <p className="mt-1 text-xs text-violet-400 opacity-0 transition group-hover:opacity-100">

                                    View Developer Profile →

                                </p>

                            </div>

                        </Link>

                        <div className="space-y-3">

                            {project.githubLink && (

                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-violet-500 hover:bg-white/10"
                                >

                                    <FaGithub
                                        size={18}
                                        className="text-violet-400"
                                    />

                                    GitHub Repository

                                </a>

                            )}

                            {project.liveLink && (

                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-violet-500 hover:bg-white/10"
                                >

                                    <Globe
                                        size={18}
                                        className="text-violet-400"
                                    />

                                    Live Demo

                                </a>

                            )}

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        <button
                            onClick={() => {
                                setType("Ownership");
                                setOpen(true);
                            }}
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                        >
                            Request Ownership
                        </button>

                        <button
                            onClick={() => {
                                setType("Collaboration");
                                setOpen(true);
                            }}
                            className="rounded-xl border border-violet-500 py-3 text-sm font-semibold text-violet-400 transition hover:bg-violet-600 hover:text-white"
                        >
                            Request Collaboration
                        </button>

                    </div>

                </div>

            </div>

            <RequestModal
                open={open}
                onClose={() => setOpen(false)}
                projectId={project._id}
                type={type}
            />
        </div>

    );

}