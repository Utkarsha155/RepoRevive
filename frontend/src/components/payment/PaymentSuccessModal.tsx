"use client";

import Link from "next/link";
import { CheckCircle2, Award, LayoutDashboard, X } from "lucide-react";

interface PaymentSuccessModalProps {
    open: boolean;
    onClose: () => void;
    certificateId: string;
}

export default function PaymentSuccessModal({
    open,
    onClose,
    certificateId
}: PaymentSuccessModalProps) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#111118] p-5 shadow-2xl sm:p-8">
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 text-gray-400 hover:text-white"
                >
                    <X size={22} />
                </button>

                <div className="flex justify-center">

                    <CheckCircle2
                        className="h-16 w-16 text-green-500 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                    />

                </div>

                <h1 className="mt-5 text-center text-2xl font-bold text-white sm:text-3xl">
                    Payment Successful 🎉

                </h1>

                <p className="mt-4 text-center text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
                    Congratulations! The ownership transfer has been completed successfully.

                </p>

                <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 sm:p-5">
                    <div className="flex items-center gap-3">

                        <Award className="text-green-400" />

                        <div>

                            <h3 className="font-semibold text-white">

                                Certificate Generated

                            </h3>

                            <p className="text-sm text-gray-400">

                                Your ownership certificate is ready.

                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-8 flex flex-col gap-3">

                    <Link
                        href={`/dashboard/certificates/${certificateId}`}
                        className="w-full  rounded-xl bg-violet-600 py-3 text-center font-semibold text-white hover:bg-violet-500"
                    >

                        View Certificate

                    </Link>

                    <Link
                        href="/dashboard"
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-white hover:bg-white/5"
                    >

                        <LayoutDashboard size={18} />

                        Dashboard

                    </Link>

                </div>

            </div>

        </div>

    );

}