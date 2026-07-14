import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090F] text-white">
      <h1 className="text-7xl font-bold">404</h1>

      <p className="mt-4 text-gray-400">
        Page not found.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-lg bg-violet-600 px-6 py-3"
      >
        Go Home
      </Link>
    </div>
  );
}