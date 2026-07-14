"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Code2 } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);
  return (
    <header className="sticky top-0 z-50 border-b border-violet-500/10 bg-[#09090F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}

        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 shadow-lg shadow-violet-500/20 transition duration-300 group-hover:scale-105 group-hover:shadow-violet-500/40">
            <Code2 className="h-5 w-5 text-white" />

          </div>

          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Repo<span className="text-violet-500">Revive</span>
          </h1>


        </Link>

        <nav className="hidden items-center gap-8 lg:flex">

          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>

          <Link
            href="/marketplace"
            className="text-gray-300 hover:text-white"
          >
            Marketplace
          </Link>

        </nav>

        {/* Right */}

        <div className="hidden items-center gap-5 lg:flex">

          <Link
            href="/auth/login"
            className="font-medium text-gray-300 transition hover:text-white"
          >
            Sign In
          </Link>

          <Link
            href="/auth/signup"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-7 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(139,92,246,0.45)]"
          >

            Get Started

            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(true)}
          className="rounded-lg p-2 transition hover:bg-white/5 lg:hidden"
        >
          <Menu size={26} />
        </button>

      </div>

      {/* Mobile Menu */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 z-50 h-screen w-[300px] border-l border-white/10 bg-[#09090F] shadow-2xl"
          >

            {/* Header */}

            <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

              <h2 className="text-xl font-bold text-white">
                Repo<span className="text-violet-500">Revive</span>
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-lg p-2 hover:bg-white/5"
              >
                <X size={24} className="text-white" />
              </button>

            </div>

            {/* Menu */}

            <nav className="flex flex-col p-6">

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/dashboard/marketplace"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Marketplace
              </Link>

              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
              >
                Sign In
              </Link>

              <Link
                href="/auth/signup"
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 py-3 font-medium text-white hover:opacity-90"
              >

                Get Started

                <ArrowRight size={18} />

              </Link>

            </nav>

          </motion.div>

        )}

      </AnimatePresence>

    </header>
  );
}