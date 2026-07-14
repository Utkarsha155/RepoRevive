"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useProject } from "@/context/ProjectContext";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectsPage() {

    const { getMyProjects } = useProject();

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {

        try {

            const res = await getMyProjects();

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

        return <p className="text-center text-white">Loading...</p>;

    }

    return (

        <div>

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#111118] p-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-white">
                        My Projects
                    </h1>

                    <p className="text-gray-400">
                        Manage your uploaded repositories.
                    </p>

                </div>

                <Link
                    href="/dashboard/upload"
                    className="rounded-xl bg-violet-600 px-5 py-3 text-white"
                >
                    <Plus size={18} className="inline mr-2" />
                    Upload Project
                </Link>

            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                {projects.map((project: any) => (

                    <ProjectCard
                        key={project._id}
                        project={project}
                        onDelete={loadProjects}
                    />

                ))}

            </div>

        </div>

    );

}