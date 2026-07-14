"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth/login");
    } else {
      setLoading(false);
    }

  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090F] text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}