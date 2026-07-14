"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCertificate } from "@/context/CertificateContext";
import { Award, Calendar, User, IndianRupee, FolderGit2 } from "lucide-react";
import api from "@/services/api";
import Link from "next/link";
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

            <div className="flex h-screen items-center justify-center text-white">

                Loading Certificate...

            </div>

        );

    }

    if (!certificate) {

        return (

            <div className="flex h-screen items-center justify-center text-red-500">

                Certificate Not Found

            </div>

        );

    }

    const downloadPdf = async (id: string) => {

        try {

            const response = await api.get(
                `/certificate/pdf/${id}`,
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "certificate.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="rounded-2xl border-2 border-violet-600 bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8 lg:p-10">
                <div className="text-center">

                    <Award
                        size={56}
                        className="mx-auto text-violet-600 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                    />

                    <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                        RepoRevive

                    </h1>

                    <h2 className="mt-3 text-xl font-semibold sm:text-2xl lg:text-3xl">
                        Project Ownership Certificate

                    </h2>

                    <p className="mt-4 text-sm uppercase tracking-wider text-gray-500 sm:text-base">
                        Certificate ID

                    </p>

                    <p className="break-all text-lg font-bold text-violet-700 sm:text-xl">
                        {certificate.certificateId}

                    </p>

                </div>

                <div className="mt-10 text-center sm:mt-12">
                    <p className="text-base text-gray-700 sm:text-lg">
                        This certifies that

                    </p>

                    <h2 className="mt-3 break-words text-2xl font-bold sm:text-3xl lg:text-4xl">
                        {certificate.buyer.name}

                    </h2>

                    <p className="mt-5 text-base text-gray-700 sm:text-lg">
                        has officially acquired ownership of
                    </p>

                    <h1 className="mt-4 break-words text-2xl font-bold text-violet-700 sm:text-3xl lg:text-4xl">
                        {certificate.project.title}

                    </h1>

                    <p className="mt-6 text-xl">

                        from

                    </p>

                    <h2 className="mt-3 break-words text-xl font-semibold sm:text-2xl lg:text-3xl">
                        {certificate.seller.name}

                    </h2>

                </div>
                <div className="mt-10 grid gap-5 lg:grid-cols-2">
                    <div className="mt-10 grid gap-5 lg:grid-cols-2">
                        <div className="mb-5 flex items-center gap-3">

                            <FolderGit2 className="text-violet-600" />

                            <h3 className="text-lg font-semibold sm:text-xl">                                Project Details

                            </h3>

                        </div>

                        <div className="space-y-3 text-sm sm:text-base">
                            <div className="flex justify-between border-b border-gray-200 pb-2 gap-4">

                                <span className="text-gray-500">
                                    Title
                                </span>

                                <span className="text-right font-semibold break-all">
                                    {certificate.project.title}
                                </span>

                            </div>

                            <div className="flex justify-between border-b border-gray-200 py-2 gap-4">

                                <span className="text-gray-500">
                                    Category
                                </span>

                                <span className="text-right font-semibold break-all">
                                    {certificate.project.category}
                                </span>

                            </div>

                            <div className="flex justify-between pt-2 gap-4">

                                <span className="text-gray-500">
                                    Project Type
                                </span>

                                <span className="text-right font-semibold break-all">
                                    {certificate.project.projectType}
                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-2xl border border-gray-300 p-6">

                        <div className="mb-5 flex items-center gap-3">

                            <IndianRupee className="text-green-600" />

                            <h3 className="text-xl font-semibold">

                                Transaction

                            </h3>

                        </div>

                        <div className="space-y-4">

                            <div className="flex justify-between border-b border-gray-200 pb-2 gap-4">

                                <span className="text-gray-500">

                                    Amount

                                </span>

                                <span className="font-semibold">

                                    ₹{certificate.payment.amount}

                                </span>

                            </div>

                            <div className="flex justify-between border-b border-gray-200 py-2 gap-4">

                                <span className="text-gray-500">

                                    Status

                                </span>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                                    {certificate.payment.paymentStatus}

                                </span>

                            </div>

                            <div className="flex justify-between pt-2 gap-4">

                                <span className="text-gray-500">

                                    Payment ID

                                </span>

                                <span className="break-all text-right text-xs sm:text-sm">

                                    {certificate.payment.razorpayPaymentId || "Demo Payment"}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <User
                                size={22}
                                className="text-violet-600"
                            />
                            <h3 className="text-lg font-semibold">

                                Buyer

                            </h3>

                        </div>

                        <div className="flex justify-between border-b border-gray-200 pb-2 gap-4">

                            <span className="text-gray-500">

                                Name

                            </span>

                            <Link
                                href={`/dashboard/developer/${certificate.buyer._id}`}
                                className="text-2xl font-bold text-violet-400 hover:underline"
                            >

                                {certificate.buyer.name}

                            </Link>

                        </div>

                        <div className="flex justify-between pt-3 gap-4">

                            <span className="text-gray-500">

                                Email

                            </span>

                            <span className="break-all text-right text-sm">

                                {certificate.buyer.email}

                            </span>

                        </div>

                    </div>

                    <div className="rounded-2xl border border-gray-300 p-6">

                        <div className="mb-5 flex items-center gap-3">

                            <User className="text-violet-600" />

                            <h3 className="text-xl font-semibold">

                                Seller

                            </h3>

                        </div>

                        <div className="flex justify-between border-b border-gray-200 pb-2 gap-4">

                            <span className="text-gray-500">

                                Name

                            </span>

                            <Link
                                href={`/dashboard/developer/${certificate.seller._id}`}
                                className="text-2xl font-bold text-red-400 hover:underline"
                            >

                                {certificate.seller.name}

                            </Link>

                        </div>

                        <div className="flex justify-between pt-3 gap-4">

                            <span className="text-gray-500">

                                Email

                            </span>

                            <span className="break-all text-right text-sm">

                                {certificate.seller.email}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="mt-8 flex flex-col items-center justify-center gap-2 rounded-2xl bg-green-100 p-4 text-center sm:flex-row">
                    <Award className="text-green-600" />

                    <span className="text-base font-semibold text-green-700 sm:text-lg">
                        Verified Ownership Transfer

                    </span>

                </div>

                <div className="mt-10 flex flex-col gap-6 border-t border-gray-200 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <div>

                        <div className="flex items-center justify-center gap-2 sm:justify-start">
                            <Calendar />

                            <span>

                                {new Date(certificate.issuedAt).toLocaleDateString()}

                            </span>

                        </div>

                    </div>

                    <div>
                        <div className="border-t-2 border-black pt-2">

                            RepoRevive

                        </div>

                        <p className="text-sm">

                            Authorized Digital Signature

                        </p>

                    </div>

                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={() => window.print()}
                        className="w-full rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 sm:w-auto"                    >

                        Print Certificate

                    </button>

                    <button
                        onClick={() => downloadPdf(certificate._id)}
                        className="w-full rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-500 sm:w-auto"                    >
                        Download PDF
                    </button>

                </div>

                <div className="mt-10 border-t border-gray-300 pt-8 text-center">
                    <h3 className="text-xl font-bold text-violet-700 sm:text-2xl">
                        RepoRevive

                    </h3>

                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-700 sm:text-base">
                        This certificate verifies the successful ownership transfer
                        of the above software project through the RepoRevive
                        Marketplace.

                    </p>

                    <p className="mx-auto mt-2 max-w-3xl text-sm leading-7 text-gray-700 sm:text-base">
                        All ownership records have been digitally verified and
                        securely stored.

                    </p>

                    <div className="mt-6 flex justify-center">
                        <div className="rounded-full border border-green-300 bg-green-100 px-5 py-2 text-sm font-semibold text-green-700 sm:px-6 sm:py-3 sm:text-base">
                            ✓ Digitally Verified

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}