"use client";

import { motion } from "framer-motion";
import {
  FolderGit2,
  MessageSquareText,
  BadgeCheck,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "List Your Project",
    description:
      "Create a project listing with its description, tech stack, repository link, screenshots, expected price, and collaboration details.",
    icon: FolderGit2,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    id: "02",
    title: "Connect & Collaborate",
    description:
      "Developers can discover projects, chat with owners, negotiate terms, and submit adoption requests securely.",
    icon: MessageSquareText,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    id: "03",
    title: "Transfer Ownership",
    description:
      "Complete the transfer through secure escrow payment and receive a digital ownership certificate after successful adoption.",
    icon: BadgeCheck,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <p className="mb-3 text-sm font-semibold uppercase tracking-[4px] text-violet-400">
            How It Works
          </p>

          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">            Revive Projects
            <br />
            In Just Three Simple Steps
          </h2>

          <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">            List your unfinished projects, connect with interested developers, and securely transfer ownership through an end-to-end adoption workflow.
          </p>

        </div>

        {/* Timeline */}

        <div className="relative">

          {/* Line */}

          <div className="absolute left-0 right-0 top-14 hidden h-[2px] bg-gradient-to-r from-violet-600 via-cyan-500 to-green-500 lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => {

              const Icon = step.icon;

              return (

                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.5,
                  }}
                  viewport={{ once: true }}
                  className="relative rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500/40"                >

                  {/* Number */}

                  <span className="absolute right-6 top-6 text-5xl font-bold text-white/10">
                    {step.id}
                  </span>

                  {/* Icon */}

                  <div
                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg}`}
                  >
                    <Icon
                      size={30}
                      className={step.color}
                    />
                  </div>

                  {/* Title */}

                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}

                  <p className="leading-8 text-gray-400">
                    {step.description}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </div>
    </section>
  );
}