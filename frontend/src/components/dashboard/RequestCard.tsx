"use client";

import Link from "next/link";
import {
  Calendar,
  IndianRupee,
  CheckCircle2,
  XCircle,
  FolderGit2,
  User,
} from "lucide-react";
import { useRequest } from "@/context/RequestContext";
import api from "@/services/api";

export default function RequestCard({ request, loadRequests }: { request: any; loadRequests: () => void; }) {

  const {
    acceptRequest,
    rejectRequest,
    cancelRequest,
  } = useRequest();

  const handleAccept = async () => {

    try {

      await acceptRequest(request._id);
      loadRequests();
      window.location.reload();

    } catch (error) {

      console.log(error);

    }

  };

  const handleReject = async () => {

    try {

      await rejectRequest(request._id);

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

  };

  const handleCancel = async () => {

    try {

      await cancelRequest(request._id);

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

  };
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

    <div className="rounded-3xl border border-white/10 bg-[#111118] p-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Link
          href={`/dashboard/developer/${request.sender?._id}`}
          className="flex items-center gap-4 group"
        >

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-xl font-bold text-white">

            {request.sender?.name?.charAt(0).toUpperCase()}

          </div>

          <div>

            <h2 className="text-xl font-semibold text-white transition group-hover:text-violet-400">

              {request.sender?.name}

            </h2>

            <p className="text-gray-400">

              {request.sender?.email}

            </p>

          </div>

        </Link>

        <span
          className={`self-start rounded-full px-3 py-1 text-xs font-medium
             ${request.status === "Pending"
              ? "bg-yellow-500/20 text-yellow-400"
              : request.status === "Accepted"
                ? "bg-green-500/20 text-green-400"
                : request.status === "Completed"
                  ? "bg-green-500/20 text-green-400"
                  : request.status === "Awaiting Payment"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-red-500/20 text-red-400"
            }`}
        >

          {request.status}

        </span>

      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-gray-300">

          <FolderGit2 size={18} />

          <span className="truncate">
            {request.project?.title}
          </span>

        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-gray-300">

          <User size={18} />

          {request.type}

        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-gray-300">

          <IndianRupee size={18} />

          {request.offerPrice > 0 ? `₹${request.offerPrice}` : "No Offer"}

        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-sm text-gray-300">

          <Calendar size={18} />

          {new Date(request.createdAt).toLocaleDateString()}

        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-white/5 bg-[#181820] p-4">
        <h3 className="mb-3 font-semibold text-white">

          Message

        </h3>

        <p className="break-words text-sm leading-6 text-gray-300">
          {request.message}

        </p>

      </div>

      <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
        <Link
          href={`/dashboard/marketplace/${request.project?._id}`}
          className="rounded-xl border border-violet-500 w-full sm:w-auto px-4 py-3 text-sm font-medium text-violet-400 hover:bg-violet-600 hover:text-white"
        >

          View Project

        </Link>

        {request.status === "Pending" && (

          <>

            <button
              onClick={handleAccept}
              className="flex items-center gap-2 rounded-xl bg-green-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white hover:bg-green-500"
            >

              <CheckCircle2 size={18} />

              Accept

            </button>

            <button
              onClick={handleReject}
              className="flex items-center gap-2 rounded-xl bg-red-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
            >

              <XCircle size={18} />

              Reject

            </button>

          </>

        )}

        {request.status === "Pending" && request.sender?._id && (

          <button
            onClick={handleCancel}
            className="rounded-xl border border-yellow-500 w-full sm:w-auto px-4 py-3 text-sm font-medium text-yellow-400 hover:bg-yellow-500 hover:text-white"
          >

            Cancel

          </button>

        )}
        {request.status === "Completed" && request.certificate && (
          <>
            <Link
              href={`/dashboard/certificates/${request.certificate?._id}`} className="rounded-xl bg-violet-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white"
            >
              View Certificate
            </Link>

            <button
              onClick={() => downloadPdf(request.certificate._id)}
              className="rounded-xl bg-green-600 w-full sm:w-auto px-4 py-3 text-sm font-medium text-white"
            >
              Download PDF
            </button>
          </>

        )}

      </div>

    </div >

  );

}