"use client";

import Link from "next/link";
import {
    Award,
    Calendar,
    Download,
    Eye,
    IndianRupee,
    User
} from "lucide-react";
import api from "@/services/api";

export default function CertificateCard({ certificate }: { certificate: any }) {

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

            link.click();

        } catch (err) {

            console.log(err);

        }

    };
    return (

        <div className="rounded-3xl border border-white/10 bg-[#111118] p-6 transition hover:border-violet-500">

            <div className="flex items-start justify-between gap-4">
                <div>

                    <h2 className="line-clamp-2 text-lg font-semibold text-white sm:text-xl">
                        {certificate.project.title}

                    </h2>

                    <p className="mt-2 text-xs uppercase tracking-wider text-gray-500">
                        Certificate ID

                    </p>

                    <p className="break-all font-mono text-xs text-violet-400 sm:text-sm">
                        {certificate.certificateId}

                    </p>

                </div>

                <Award
                    size={42}
                    className="shrink-0 text-yellow-400 sm:h-14 sm:w-14"
                />

            </div>

            <div className="mt-6 space-y-3 rounded-xl bg-white/5 p-4">
                <div className="flex items-center gap-3 text-sm">

                    <User size={16} className="text-violet-400" />

                    <span className="text-gray-400">
                        Buyer
                    </span>

                    <Link
                        href={`/dashboard/developer/${certificate.buyer._id}`}
                        className="ml-auto break-all font-medium text-violet-400 hover:underline"
                    >

                        {certificate.buyer.name}

                    </Link>

                </div>

                <div className="flex items-center gap-3 text-sm">

                    <User size={16} className="text-violet-400" />

                    <span className="text-gray-400">
                        Seller
                    </span>

                    <Link
                        href={`/dashboard/developer/${certificate.seller._id}`}
                        className="ml-auto break-all font-medium text-violet-400 hover:underline"
                    >

                        {certificate.seller.name}

                    </Link>

                </div>

                <div className="flex items-center gap-3 text-sm text-gray-300">

                    <IndianRupee size={18} />

                    <span>

                        ₹{certificate.payment.amount}

                    </span>

                </div>

                <div className="flex items-center gap-3 text-sm text-gray-300">

                    <Calendar size={18} />

                    <span>

                        {new Date(certificate.issuedAt).toLocaleDateString()}

                    </span>

                </div>

            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                    href={`/dashboard/certificates/${certificate._id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"                >

                    <Eye size={18} />

                    View

                </Link>

                <button
                    onClick={() => downloadPdf(certificate._id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-violet-500 bg-white/5 px-5 py-3 text-sm font-semibold text-violet-300 transition hover:bg-violet-600 hover:text-white"
                >

                    <Download size={18} />

                    Download PDF

                </button>

            </div>
        </div>

    );

}