"use client";

import Link from "next/link";
import {
  FaGithub,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { Code2 } from "lucide-react";

const product = [
  "Marketplace",
  "Pricing",
  "Changelog",
];

const company = [
  "About",
  "Blog",
  "Careers",
  "Press Kit",
];

const legal = [
  "Privacy Policy",
  "Terms of Service",
  "Cookie Policy",
  "Escrow Terms",
];

const developers = [
  "API Docs",
  "GitHub",
  "Status",
  "SDK",
];

export default function Footer() {
  return (
    <footer className="border-t border-violet-500/10 bg-[#09090F]">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-5">

          {/* Logo */}

          <div className="max-w-sm">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 shadow-lg shadow-violet-500/20 transition duration-300 group-hover:scale-105 group-hover:shadow-violet-500/40">
                <Code2 className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-6" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Repo
                <span className="text-violet-500">Revive</span>
              </h2>
            </Link>

            <p className="mt-6 text-sm leading-7 text-gray-400 sm:text-base">
              A marketplace for abandoned software projects. Give your code a second
              life.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl border border-violet-500/20 p-3 transition hover:bg-violet-500/10">
                <FaGithub size={18} />
              </button>

              <button className="rounded-xl border border-violet-500/20 p-3 transition hover:bg-violet-500/10">
                <FaXTwitter size={18} />
              </button>

              <button className="rounded-xl border border-violet-500/20 p-3 transition hover:bg-violet-500/10">
                <FaLinkedinIn size={18} />
              </button>
            </div>
          </div>

          {/* Product */}

          <div>

            <h3 className="mb-6 uppercase tracking-[4px] text-violet-500">

              Product

            </h3>

            <div className="space-y-5">

              {product.map((item) => (

                <Link
                  key={item}
                  href="/"
                  className="block text-gray-400 hover:text-white"
                >
                  {item}
                </Link>

              ))}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 uppercase tracking-[4px] text-violet-500">

              Company

            </h3>

            <div className="space-y-5">

              {company.map((item) => (

                <Link
                  key={item}
                  href="/"
                  className="block text-gray-400 hover:text-white"
                >
                  {item}
                </Link>

              ))}

            </div>

          </div>

          {/* Legal */}

          <div>

            <h3 className="mb-6 uppercase tracking-[4px] text-violet-500">

              Legal

            </h3>

            <div className="space-y-5">

              {legal.map((item) => (

                <Link
                  key={item}
                  href="/"
                  className="block text-gray-400 hover:text-white"
                >
                  {item}
                </Link>

              ))}

            </div>

          </div>

          {/* Developers */}

          <div>

            <h3 className="mb-6 uppercase tracking-[4px] text-violet-500">

              Developers

            </h3>

            <div className="space-y-5">

              {developers.map((item) => (

                <Link
                  key={item}
                  href="/"
                  className="block text-gray-400 hover:text-white"
                >
                  {item}
                </Link>

              ))}

            </div>

          </div>

        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-violet-500/10 pt-8 text-gray-500 md:flex-row">

          <p>
            © 2026 RepoRevive. All rights reserved.
          </p>

          <p>
            Built for devs who ship, not hoard.
          </p>

        </div>

      </div>

    </footer>
  );
}