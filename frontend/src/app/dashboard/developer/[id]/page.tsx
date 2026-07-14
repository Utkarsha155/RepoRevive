"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    User,
    Mail,
    MapPin,
    Globe,
    Award,
    Trophy,
    FolderGit2
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useDeveloper } from "@/context/DeveloperContext";

export default function DeveloperProfilePage() {

    const { id } = useParams();

    const { getDeveloperProfile } = useDeveloper();

    const [developer, setDeveloper] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDeveloper();

    }, []);

    const loadDeveloper = async () => {

        try {

            const res = await getDeveloperProfile(
                id as string
            );

            setDeveloper(res);

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

                Loading Developer...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Hero */}

            <div className="rounded-3xl border border-white/10 bg-[#111118] p-6 sm:p-8">

                <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

                    {/* Avatar */}

                    <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-violet-600 text-5xl font-bold text-white lg:mx-0">

                        {
                            developer.user.name
                                ?.charAt(0)
                                .toUpperCase()
                        }

                    </div>

                    {/* Details */}

                    <div className="flex-1 text-center lg:text-left">

                        <h1 className="text-3xl font-bold text-white sm:text-4xl">

                            {developer.user.name}

                        </h1>

                        <p className="mt-3 text-violet-400">

                            {
                                developer.user.headline ||
                                "Software Developer"
                            }

                        </p>

                        <p className="mt-6 max-w-3xl leading-7 text-gray-300">

                            {
                                developer.user.bio ||
                                "No bio added."
                            }

                        </p>

                    </div>

                </div>

            </div>

            {/* Stats */}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                <StatCard
                    icon={<Award />}
                    title="Certificates"
                    value={developer.stats.certificates}
                />

                <StatCard
                    icon={<Trophy />}
                    title="Ownerships"
                    value={developer.stats.ownerships}
                />

                <StatCard
                    icon={<FolderGit2 />}
                    title="Projects Uploaded"
                    value={developer.stats.projects}
                />

            </div>

            {/* Contact */}

            <div className="rounded-3xl border border-white/10 bg-[#111118] p-6">

                <h2 className="mb-6 text-2xl font-semibold text-white">

                    Contact Information

                </h2>

                <div className="grid gap-5 md:grid-cols-2">

                    <InfoRow
                        icon={<Mail />}
                        title="Email"
                        value={developer.user.email}
                    />

                    <InfoRow
                        icon={<MapPin />}
                        title="Address"
                        value={
                            developer.user.address ||
                            "Not Added"
                        }
                    />

                    <InfoRow
                        icon={<FaGithub />}
                        title="GitHub"
                        value={
                            developer.user.github ||
                            "Not Added"
                        }
                    />

                    <InfoRow
                        icon={<FaLinkedin />}
                        title="LinkedIn"
                        value={
                            developer.user.linkedin ||
                            "Not Added"
                        }
                    />

                    <div className="md:col-span-2">

                        <InfoRow
                            icon={<Globe />}
                            title="Portfolio"
                            value={
                                developer.user.portfolio ||
                                "Not Added"
                            }
                        />

                    </div>

                </div>

            </div>

            {/* Skills */}

            <div className="rounded-3xl border border-white/10 bg-[#111118] p-6">

                <h2 className="mb-6 text-2xl font-semibold text-white">

                    Skills

                </h2>

                {

                    developer.user.skills?.length > 0 ?

                        (

                            <div className="flex flex-wrap gap-3">

                                {

                                    developer.user.skills.map(

                                        (skill: string) => (

                                            <span
                                                key={skill}
                                                className="rounded-full bg-violet-600/20 px-4 py-2 text-violet-300"
                                            >

                                                {skill}

                                            </span>

                                        )

                                    )

                                }

                            </div>

                        )

                        :

                        (

                            <p className="text-gray-400">

                                No skills added.

                            </p>

                        )

                }

            </div>

        </div>

    );

}

function StatCard({
    icon,
    title,
    value
}: any) {

    return (

        <div className="rounded-2xl border border-white/10 bg-[#111118] p-6">

            <div className="mb-4 text-violet-400">

                {icon}

            </div>

            <h2 className="text-3xl font-bold text-white">

                {value}

            </h2>

            <p className="mt-2 text-gray-400">

                {title}

            </p>

        </div>

    );

}

function InfoRow({
    icon,
    title,
    value
}: any) {

    const isUrl =
        typeof value === "string" &&
        value.startsWith("http");

    return (

        <div className="rounded-xl bg-[#181820] p-5">

            <div className="mb-3 flex items-center gap-3 text-violet-400">

                {icon}

                <span className="font-medium">

                    {title}

                </span>

            </div>

            {

                isUrl ?

                    (

                        <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="break-all text-blue-400 hover:underline"
                        >

                            {value}

                        </a>

                    )

                    :

                    (

                        <p className="break-all text-gray-300">

                            {value}

                        </p>

                    )

            }

        </div>

    );

}