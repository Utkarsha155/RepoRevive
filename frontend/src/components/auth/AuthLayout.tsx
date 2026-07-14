import Link from "next/link";
import { Code2 } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090F]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute bottom-[-120px] right-[-120px] h-80 w-80 rounded-full bg-fuchsia-600/10 blur-3xl" />

      </div>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        {/* Left */}

        <div className="hidden w-1/2 items-center justify-center px-10 xl:px-16 lg:flex">
          <div className="max-w-xl">

            <div className="mb-10 flex items-center gap-4">

              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 shadow-lg shadow-violet-500/30">

                <Code2 className="h-7 w-7 text-white" />

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Repo<span className="text-violet-500">Revive</span>
              </h1>

            </div>

            <h2 className="text-5xl font-extrabold leading-tight text-white">              Revive.
              <br />
              Collaborate.
              <br />
              Build.
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-gray-400">
              Discover abandoned software projects, collaborate with developers,
              negotiate ownership, and give innovative ideas a second life through one
              secure platform.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-1 items-start justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10">            <Link
            href="/"
            className="group mb-10 inline-flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 transition duration-300 group-hover:scale-105">
              <Code2 className="h-5 w-5 text-white" />
            </div>

            <span className="text-lg font-bold text-white">
              Repo<span className="text-violet-500">Revive</span>
            </span>
          </Link>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
              {subtitle}
            </p>

            <div className="mt-8">
              {children}
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}