"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProject } from "@/context/ProjectContext";

export default function EditProjectPage() {

    const router = useRouter();

    const { projectId } = useParams();

    const { getProject, updateProject } = useProject();

    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [category, setCategory] = useState("");

    const [githubLink, setGithubLink] = useState("");

    const [liveLink, setLiveLink] = useState("");

    const [image, setImage] = useState("");

    const [readme, setReadme] = useState("");

    const [techStack, setTechStack] = useState("");

    const [tags, setTags] = useState("");

    const [projectType, setProjectType] = useState("");

    const [compensationType, setCompensationType] = useState("");

    const [price, setPrice] = useState(0);

    const [negotiable, setNegotiable] = useState(false);

    const [difficulty, setDifficulty] = useState("");

    const [lookingFor, setLookingFor] = useState("");

    useEffect(() => {

        if (projectId) {

            loadProject();

        }

    }, [projectId]);

    const loadProject = async () => {

        try {

            const res = await getProject(projectId as string);

            const p = res.project;

            setTitle(p.title);

            setDescription(p.description);

            setCategory(p.category);

            setGithubLink(p.githubLink);

            setLiveLink(p.liveLink || "");

            setImage(p.image || "");

            setReadme(p.readme || "");

            setTechStack(p.techStack?.join(", ") || "");
            setTags(p.tags?.join(", ") || "");

            setProjectType(p.projectType);

            setCompensationType(p.compensationType);

            setPrice(p.price);

            setNegotiable(p.negotiable);

            setDifficulty(p.difficulty);

            setLookingFor(p.lookingFor);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleUpdate = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            const data = {
                title,
                description,
                category,
                githubLink,
                liveLink,
                image,
                readme,
                techStack: techStack.split(",").map(item => item.trim()),
                tags: tags.split(",").map(item => item.trim()),
                projectType,
                compensationType,
                price,
                negotiable,
                difficulty,
                lookingFor
            };

            const res = await updateProject(projectId as string, data);

            if (res.success) {

                alert("Project updated successfully.");

                router.push(`/dashboard/projects/${projectId}`);

            }

        }

        catch (error: any) {

            alert(error.response?.data?.message || "Failed to update project");

        }

    };

    if (loading) {

        return (

            <div className="py-24 text-center text-white">

                Loading...

            </div>

        );

    }

    return (

        <form
            onSubmit={handleUpdate}
            className="mx-auto max-w-7xl"
        >

            <h1 className="mb-8 text-3xl font-bold text-white">

                Edit Project

            </h1>

            <div className="space-y-6 rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6 lg:p-8">

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                        Project Title

                    </label>

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                        Description

                    </label>

                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">

                            Category

                        </label>

                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">

                            Project Type

                        </label>

                        <select
                            value={projectType}
                            onChange={(e) => setProjectType(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"                        >

                            <option value="Ownership">

                                Ownership

                            </option>

                            <option value="Collaboration">

                                Collaboration

                            </option>

                            <option value="Open Source">

                                Open Source

                            </option>

                        </select>

                    </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">

                            GitHub Repository

                        </label>

                        <input
                            value={githubLink}
                            onChange={(e) => setGithubLink(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">

                            Live Demo

                        </label>

                        <input
                            value={liveLink}
                            onChange={(e) => setLiveLink(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                    </div>

                </div>
                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                        Project Image URL

                    </label>

                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.png"
                        className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                        Tech Stack

                    </label>

                    <input
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        placeholder="React, Node.js, MongoDB"
                        className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                    <p className="mt-2 text-xs text-gray-500">
                        Separate technologies using commas.

                    </p>

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                        Tags

                    </label>

                    <input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="AI, Resume, Open Source"
                        className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                    <p className="mt-2 text-sm text-gray-400">

                        Separate tags using commas.

                    </p>

                </div>

                <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                        README

                    </label>

                    <textarea
                        rows={8}
                        value={readme}
                        onChange={(e) => setReadme(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                </div>

                <div className="grid gap-5 lg:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">

                            Compensation Type

                        </label>

                        <select
                            value={compensationType}
                            onChange={(e) => setCompensationType(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"                        >

                            <option value="Free">

                                Free

                            </option>

                            <option value="Paid">

                                Paid

                            </option>

                            <option value="Negotiable">

                                Negotiable

                            </option>

                            <option value="Equity">

                                Equity

                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">

                            Price (₹)

                        </label>

                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />

                    </div>

                </div>

                <div className="grid gap-6 md:grid-cols-2">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">

                            Difficulty

                        </label>

                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"                        >

                            <option value="Beginner">

                                Beginner

                            </option>

                            <option value="Intermediate">

                                Intermediate

                            </option>

                            <option value="Advanced">

                                Advanced

                            </option>

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-300">

                            Looking For

                        </label>

                        <select
                            value={lookingFor}
                            onChange={(e) => setLookingFor(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"                        >

                            <option value="Buyer">

                                Buyer

                            </option>

                            <option value="Collaborator">

                                Collaborator

                            </option>

                            <option value="Investor">

                                Investor

                            </option>

                            <option value="Contributor">

                                Contributor

                            </option>

                        </select>

                    </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#181820] px-4 py-3">
                    <input
                        type="checkbox"
                        className="h-5 w-5 accent-violet-600"
                        onChange={(e) => setNegotiable(e.target.checked)}
                    />

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                        Price Negotiable

                    </label>

                </div>
                <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"                    >

                        Cancel

                    </button>

                    <button
                        type="submit"
                        className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"                    >

                        Save Changes

                    </button>
                </div>
            </div>
        </form>
    );
}