"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    BadgeCheck,
    Download,
    User,
    FolderGit2,
    Calendar,
    IndianRupee
} from "lucide-react";
import { useCertificate } from "@/context/CertificateContext";
import api from "@/services/api";

export default function CertificatePage() {

    const { id } = useParams();

    const { getCertificate } = useCertificate();

    const [certificate, setCertificate] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadCertificate();

    }, []);

    const loadCertificate = async () => {

        try {

            const res = await getCertificate(id as string);

            setCertificate(res.certificate);

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

                Loading Certificate...

            </div>

        );

    }

    if (!certificate) {

        return (

            <div className="flex h-[70vh] items-center justify-center text-red-500">

                Certificate Not Found

            </div>

        );

    }
    const downloadCertificate = async () => {

        try {

            const response = await api.get(
                `/certificate/pdf/${certificate._id}`,
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = `RepoRevive-${certificate.certificateId}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }

        catch (error) {

            console.log(error);

        }

    };
    return (

        <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6">
            <div className="overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-900 via-[#181825] to-[#111118] shadow-2xl lg:rounded-3xl">
                <div className="border-b border-white/10 px-5 py-8 text-center sm:px-8 sm:py-10">
                    <BadgeCheck
                        size={52}
                        className="mx-auto mb-5 text-green-400 sm:h-16 sm:w-16 lg:h-[70px] lg:w-[70px]" />

                    <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">

                        Ownership Certificate

                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base lg:text-lg">

                        Official Proof of Repository Ownership Transfer

                    </p>

                    <div className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-300 sm:text-base lg:text-lg">

                        Verified Successfully

                    </div>

                </div>

                <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-2 lg:gap-8 lg:p-10">

                    <div className="space-y-6">

                        <div className="rounded-2xl border border-white/10 bg-[#181820] p-5 sm:p-6">

                            <h2 className="mb-4 flex items-center gap-3 text-lg font-semibold text-white sm:text-xl">

                                <User />

                                Buyer

                            </h2>

                            <p className="break-words text-lg font-bold text-violet-400 sm:text-2xl">

                                {certificate.buyer.name}

                            </p>

                            <p className="mt-2 break-all text-sm text-gray-400">

                                {certificate.buyer.email}

                            </p>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#181820] p-5 sm:p-6">

                            <h2 className="mb-4 flex items-center gap-3 text-lg font-semibold text-white sm:text-xl">

                                <User />

                                Previous Owner

                            </h2>

                            <p className="text-2xl font-bold text-red-400">
                                {certificate.seller.name}

                            </p>

                            <p className="mt-2 break-all text-sm text-gray-400">

                                {certificate.seller.email}

                            </p>

                        </div>

                    </div>

                    <div className="space-y-6">

                        <div className="rounded-2xl border border-white/10 bg-[#181820] p-5 sm:p-6">

                            <h2 className="mb-4 flex items-center gap-3 text-lg font-semibold text-white sm:text-xl">

                                <FolderGit2 />

                                Project

                            </h2>

                            <p className="break-words text-lg font-bold text-violet-400 sm:text-2xl">

                                {certificate.project.title}

                            </p>

                            <p className="mt-2 break-all text-sm text-gray-400">

                                {certificate.project.category}

                            </p>

                            <p className="text-gray-400">

                                {certificate.project.projectType}

                            </p>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#181820] p-5 sm:p-6">

                            <h2 className="mb-5 text-2xl font-semibold text-white">

                                Payment

                            </h2>

                            <div className="space-y-4">

                                <div className="flex items-center gap-3 text-gray-300">

                                    <IndianRupee />

                                    ₹{certificate.payment.amount}

                                </div>

                                <div className="flex items-center gap-3 text-green-400">

                                    <BadgeCheck />

                                    {certificate.payment.paymentStatus}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="border-t border-white/10 p-5 sm:p-8 lg:p-10">

                    <div className="grid gap-5 md:grid-cols-2">

                        <div>

                            <h3 className="mb-3 text-lg font-semibold text-white">

                                Certificate ID

                            </h3>

                            <p className="break-all rounded-xl bg-[#181820] p-4 font-mono text-xs text-violet-400 sm:text-sm">

                                {certificate.certificateId}

                            </p>

                        </div>

                        <div>

                            <h3 className="mb-3 text-lg font-semibold text-white">

                                Issued On

                            </h3>

                            <p className="flex items-center gap-3 rounded-xl bg-[#181820] p-4 text-sm text-gray-300">

                                <Calendar size={18} />

                                {new Date(certificate.issuedAt).toLocaleDateString()}

                            </p>

                        </div>

                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-[#181820] p-5 sm:p-6">

                        <h2 className="mb-5 text-2xl font-semibold text-white">

                            Payment Details

                        </h2>

                        <div className="space-y-4">

                            <div className="flex items-center justify-between gap-4 border-b border-white/5 py-3 last:border-none">

                                <span className="text-gray-400">

                                    Amount

                                </span>

                                <span className="font-semibold text-white">

                                    ₹{certificate.payment.amount}

                                </span>

                            </div>

                            <div className="flex items-center justify-between gap-4 border-b border-white/5 py-3 last:border-none">

                                <span className="text-gray-400">

                                    Status

                                </span>

                                <span className="font-semibold text-green-400">

                                    {certificate.payment.paymentStatus}

                                </span>

                            </div>

                            <div className="flex items-center justify-between gap-4 border-b border-white/5 py-3 last:border-none">

                                <span className="text-gray-400">

                                    Payment ID

                                </span>

                                <span className="break-all text-right font-mono text-xs text-violet-400 sm:text-sm">

                                    {certificate.payment.razorpayPaymentId || "Demo Payment"}

                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="mt-8 flex justify-center">

                        <button
                            onClick={downloadCertificate}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] sm:w-auto sm:px-8 sm:py-4 sm:text-base"                        >

                            <Download size={20} />

                            Download PDF

                        </button>

                    </div>

                    <div className="mt-10 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-center sm:p-8">
                        <BadgeCheck
                            size={40}
                            className="mx-auto mb-5 text-green-400"
                        />

                        <h2 className="text-xl font-bold text-green-400 sm:text-3xl">

                            Ownership Successfully Transferred

                        </h2>

                        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-300 sm:text-base lg:text-lg">

                            This certificate has been digitally generated by RepoRevive after
                            successful verification of project ownership transfer. It confirms
                            that the buyer is now the official owner of this repository.

                        </p>

                    </div>

                    <div className="mt-10 border-t border-white/10 pt-6 text-center">
                        <p className="text-base font-semibold text-white sm:text-lg">

                            RepoRevive Digital Ownership Registry

                        </p>

                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">

                            This certificate is digitally signed and can be verified using its
                            Certificate ID.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );
}