"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090F] text-white">
      <h1 className="text-4xl font-bold">Something went wrong!</h1>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-violet-600 px-6 py-3"
      >
        Try Again
      </button>
    </div>
  );
}