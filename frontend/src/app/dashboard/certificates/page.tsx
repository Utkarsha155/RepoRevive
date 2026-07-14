"use client";

import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { useCertificate } from "@/context/CertificateContext";
import CertificateCard from "@/components/certificate/CertificateCard";

export default function CertificatesPage() {

    const { getMyCertificates } = useCertificate();

    const [certificates, setCertificates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadCertificates();

    }, []);

    const loadCertificates = async () => {

        try {

            const res = await getMyCertificates();

            setCertificates(res.certificates);

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

            <div className="flex h-[70vh] items-center justify-center text-white text-xl">

                Loading Certificates...

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">

                        <Award className="h-7 w-7 text-violet-500" />

                        My Certificates

                    </h1>

                    <p className="mt-2 text-sm text-gray-400 sm:text-base">

                        View and download your ownership certificates.

                    </p>

                </div>

                <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">

                    {certificates.length} Certificates

                </div>

            </div>

            {

                certificates.length === 0 ?

                    (

                        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#111118] p-6">
                            <div className="text-center">

                                <Award
                                    size={56}
                                    className="mx-auto text-violet-500/60"
                                />

                                <h2 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
                                    No Certificates Yet

                                </h2>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
                                    Certificates will appear here after successful ownership transfer.

                                </p>

                            </div>

                        </div>

                    )

                    :

                    (

                        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
                            {

                                certificates.map((certificate: any) => (

                                    <CertificateCard
                                        key={certificate._id}
                                        certificate={certificate}
                                    />

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}